import { Builder, LinkBuilder } from '../../base'
import { ZoneBuilder, zoneWeakMap } from './zone'
import { Position } from '../../types'
import { ComponentNode, ComponentBuilderNode } from '../types'

export const componentWeakMap: WeakMap<ComponentBuilder, string> = new WeakMap()

export class ComponentBuilder extends Builder {
  #id: string
  #meta: ComponentBuilderNode
  #component: ComponentNode

  constructor(
    meta: ComponentBuilderNode,
    label: string,
    type: 'actor' | 'usecase',
  ) {
    super()
    this.#meta = meta
    this.#id = `a_${this.id(label)}`
    componentWeakMap.set(this, this.#id)

    this.#component = {
      id: this.#id,
      stereotypes: '',
      type,
      label,
    }
    this.#meta.components.push(this.#component)
  }

  /**
   * setting stereotypes
   * @param s
   * @returns
   */
  stereotypes(s: string) {
    this.#component.stereotypes = s
    return this
  }

  /**
   * setting note of actor
   * @param label
   * @param position
   * @returns
   */
  noteOf(label: string, position: Position = 'right') {
    this.#meta.notes.push({ label, position, on: this.#id })
    return this
  }

  /**
   * setting link with actor or usecase
   * @param c
   * @param fn
   * @returns
   */
  link(
    c: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    c = Array.isArray(c) ? c : [c]
    const to = c.map((c) => c.#id)

    const link = { from: this.#id, to }
    fn && fn(new LinkBuilder(link))

    this.#meta.links.push(link)
    return this
  }

  /**
   * setting vlink with actor or usecase
   * @param c
   * @param fn
   * @returns
   */
  vlink(
    c: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    c = Array.isArray(c) ? c : [c]
    const to = c.map((c) => c.#id)

    const link = { from: this.#id, to }
    fn && fn(new LinkBuilder(link))

    this.#meta.vlinks.push(link)
    return this
  }

  /**
   * setting relation with actor or usecase
   * @param i
   */
  rel(
    i: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (r: LinkBuilder) => void,
  ) {
    i = Array.isArray(i) ? i : [i]
    const to = i.map((i) => componentWeakMap.get(i)!)

    const rel = { from: this.#id, to }
    fn && fn(new LinkBuilder(rel))

    this.#meta.rels.push(rel)

    return this
  }

  /**
   * setting belongTo zone
   * @param z
   * @returns
   */
  belongTo(z: ZoneBuilder) {
    const id = zoneWeakMap.get(z)!
    const zone = this.#meta.zones.find((zone) => zone.id === id)
    zone?.components.push(this.#component)

    // remove from actors
    const index = this.#meta.components.findIndex((c) => c.id === this.#id)
    this.#meta.components.splice(index, 1)

    return this
  }
}
