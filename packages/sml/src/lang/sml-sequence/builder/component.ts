import { Builder, LinkBuilder } from '../../base'
import { Position } from '../../types'
import { Component, ComponentBuilderMeta, ComponentType } from '../types'

export const componentWeakMap: WeakMap<ComponentBuilder, string> = new WeakMap()

export class ComponentBuilder extends Builder {
  #meta: ComponentBuilderMeta
  #id: string
  #component: Component

  constructor(meta: ComponentBuilderMeta, label: string, type: ComponentType) {
    super()
    this.#meta = meta
    const prefix = type.charAt(0)
    this.#id = prefix + this.id(label)
    componentWeakMap.set(this, this.#id)

    this.#component = {
      id: this.#id,
      label,
      type,
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
   * setting note for component
   * @param label
   * @param position
   * @returns
   */
  note(label: string, position: Position = 'right') {
    this.#meta.notes.push({ label, position, on: this.#id })
    return this
  }

  #to(dist: Array<ComponentBuilder> | ComponentBuilder) {
    dist = Array.isArray(dist) ? dist : [dist]
    return dist.map((builder) => {
      return componentWeakMap.get(builder)!
    })
  }
}
