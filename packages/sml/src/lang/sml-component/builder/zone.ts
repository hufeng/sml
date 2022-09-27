import { Builder } from '../../base'
import { ComponentBuilder, componentWeakMap } from './component'
import {
  ComponentContainer,
  ComponentZoneStyle,
  ZoneBuilderMeta,
} from '../types'

export const zoneWeakMap: WeakMap<ZoneBuilder, string> = new WeakMap()

export class ZoneBuilder extends Builder {
  #meta: ZoneBuilderMeta
  #name: string
  #zone: ComponentContainer

  constructor(meta: ZoneBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = 'z_' + this.id(label)
    zoneWeakMap.set(this, this.#name)

    this.#zone = {
      label,
      name: this.#name,
      type: 'package',
      components: [],
    }

    this.#meta.zones.push(this.#zone)
  }

  /**
   * setting type
   * @param type
   * @returns
   */
  type(type: ComponentZoneStyle) {
    this.#zone.type = type
    return this
  }

  /**
   * setting children
   * @param arr
   */
  has(...arr: Array<ComponentBuilder>) {
    arr.forEach((builder) => {
      // update component
      const name = componentWeakMap.get(builder)!
      const index = this.#meta.components.findIndex(
        (component) => component.id === name,
      )
      this.#zone.components.push(this.#meta.components[index]!)
      this.#meta.components.splice(index, 1)
    })
  }
}
