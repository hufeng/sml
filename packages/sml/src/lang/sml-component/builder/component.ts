import { Builder } from '../../base'
import { Position, ComponentBuilderMeta } from '../../types'
import { InterfaceBuilder, interfaceWeakMap } from './interface'
import { LinkBuilder } from './link'

export const componentWeakMap: WeakMap<ComponentBuilder, string> = new WeakMap()

export class ComponentBuilder extends Builder {
  #meta: ComponentBuilderMeta
  #id: string

  constructor(meta: ComponentBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#id = `c_` + this.id(label)
    componentWeakMap.set(this, this.#id)

    const component = {
      label,
      id: this.#id,
    }
    this.#meta.components.push(component)
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
  rel(dist: InterfaceBuilder | Array<InterfaceBuilder>) {
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

  #to(
    dist:
      | InterfaceBuilder
      | ComponentBuilder
      | Array<InterfaceBuilder | ComponentBuilder>,
  ) {
    dist = Array.isArray(dist) ? dist : [dist]
    return dist.map((builder) => {
      if (builder instanceof InterfaceBuilder) {
        return interfaceWeakMap.get(builder)!
      } else if (builder instanceof ComponentBuilder) {
        return componentWeakMap.get(builder)!
      } else {
        return ''
      }
    })
  }
}
