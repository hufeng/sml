import { ComponentBuilder, componentWeakMap } from './component'
import { Builder } from '../../base'
import { ZoneBuilderNode, ZoneNode } from '../types'
import { ZoneType } from '../../types'

export const zoneWeakMap: WeakMap<ZoneBuilder, string> = new WeakMap()

export class ZoneBuilder extends Builder {
  #meta: ZoneBuilderNode
  #zone: ZoneNode
  #id: string

  constructor(meta: ZoneBuilderNode, label: string) {
    super()
    this.#meta = meta
    this.#id = 'z_' + this.id(label)
    zoneWeakMap.set(this, this.#id)

    this.#zone = {
      id: this.#id,
      label,
      stereotypes: '',
      type: 'Rectangle',
      components: [],
    }
    this.#meta.zones.push(this.#zone)
  }

  /**
   * setting stereotypes
   * @param s
   * @returns
   */
  stereotypes(s: string) {
    this.#zone.stereotypes = s
    return this
  }

  /**
   * setting zone style, include 'package' | 'node' | 'cloud' | 'database'
   * @param type
   */
  style(type: ZoneType) {
    this.#zone.type = type
    return this
  }

  /**
   * setting has actor or usecase
   * @param children
   */
  has(...children: Array<ComponentBuilder>) {
    for (let child of children) {
      const id = componentWeakMap.get(child)!
      const index = this.#meta.components.findIndex((actor) => actor.id === id)
      this.#zone.components.push(this.#meta.components[index]!)
      this.#meta.components.splice(index, 1)
    }
  }
}
