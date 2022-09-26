import { Builder } from '../../base'
import { ComponentBuilder, componentWeakMap } from './component'
import { InterfaceBuilder, interfaceWeakMap } from './interface'
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
      infs: [],
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
  has(...arr: Array<ComponentBuilder | InterfaceBuilder>) {
    arr.forEach((builder) => {
      // update component
      if (builder instanceof ComponentBuilder) {
        const name = componentWeakMap.get(builder)!
        const index = this.#meta.components.findIndex(
          (component) => component.id === name,
        )
        this.#zone.components.push(this.#meta.components[index]!)
        this.#meta.components.splice(index, 1)
      }

      // update interface
      else if (builder instanceof InterfaceBuilder) {
        const name = interfaceWeakMap.get(builder)!
        const index = this.#meta.infs.findIndex((inf) => inf.id === name)
        this.#zone.infs.push(this.#meta.infs[index]!)
        this.#meta.infs.splice(index, 1)
      }
    })
  }
}
