import { Builder, LinkBuilder } from '../../base'
import { ZoneBuilder, zoneWeakMap } from './zone'
import { Position } from '../../types'
import { Component, ComponentBuilderMeta } from '../types'

export const componentWeakMap: WeakMap<ComponentBuilder, string> = new WeakMap()

export class ComponentBuilder extends Builder {
  #meta: ComponentBuilderMeta
  #id: string
  #component: Component

  constructor(
    meta: ComponentBuilderMeta,
    label: string,
    type: 'component' | 'interface',
  ) {
    super()
    this.#meta = meta
    this.#id = `c_` + this.id(label)
    const prefix = type === 'interface' ? 'i_' : 'c_'
    this.#id = prefix + this.id(label)
    componentWeakMap.set(this, this.#id)

    this.#component = {
      label,
      type,
      id: this.#id,
    }
    this.#meta.components.push(this.#component)
  }

  /**
   * setting link with component
   * @param dist
   * @param fn
   * @returns
   */
  link(
    dist: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    const link = {
      from: this.#id,
      to: this.#to(dist),
    }
    fn && fn(new LinkBuilder(link))
    this.#meta.links.push(link)

    return this
  }

  /**
   * setting virtual link with component
   * @param dist
   * @param fn
   * @returns
   */
  vlink(
    dist: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (v: LinkBuilder) => void,
  ) {
    const link = {
      from: this.#id,
      to: this.#to(dist),
    }
    fn && fn(new LinkBuilder(link))
    this.#meta.vlinks.push(link)

    return this
  }

  /**
   * setting relation with interface
   * @param dist
   * @returns
   */
  rel(dist: ComponentBuilder | Array<ComponentBuilder>) {
    this.#meta.rels.push({
      from: this.#id,
      to: this.#to(dist),
    })

    return this
  }

  /**
   * setting note for component
   * @param label
   * @param position
   * @returns
   */
  note(label: string, position: Position = 'right') {
    this.#meta.notes.push({ label, position, on: this.#id })
    return this
  }

  /**
   * setting belong to zone
   * @param z
   * @returns
   */
  belongTo(z: ZoneBuilder) {
    const name = zoneWeakMap.get(z)!
    const zone = this.#meta.zones.find((zone) => zone.name === name)
    zone?.components.push(this.#component)

    const index = this.#meta.components.findIndex((c) => c.id === this.#id)
    this.#meta.components.splice(index, 1)

    return this
  }

  #to(dist: Array<ComponentBuilder> | ComponentBuilder) {
    dist = Array.isArray(dist) ? dist : [dist]
    return dist.map((builder) => {
      return componentWeakMap.get(builder)!
    })
  }
}
