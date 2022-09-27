import { Builder, LinkBuilder } from '../../base'
import { ZoneBuilder, zoneWeakMap } from './zone'
import { Deployment, DeploymentLangAst } from '../types'

export type ComponentBuilderMeta = Pick<
  DeploymentLangAst,
  'components' | 'zones' | 'rels' | 'links' | 'vlinks'
>
export type DeployComponentType =
  | 'queue'
  | 'stack'
  | 'actor'
  | 'boundary'
  | 'interface'
  | 'hexagon'
  | 'control'
  | 'collections'
  | 'component'

export const componentWeakMap: WeakMap<ComponentBuilder, string> = new WeakMap()

export class ComponentBuilder extends Builder {
  #meta: ComponentBuilderMeta
  #name: string
  #component: Deployment

  constructor(
    meta: ComponentBuilderMeta,
    label: string,
    type: DeployComponentType,
  ) {
    super()
    this.#meta = meta
    const prefix = type === 'interface' ? 'i_' : 'c_'
    this.#name = prefix + this.id(label)
    componentWeakMap.set(this, this.#name)

    this.#component = {
      id: this.#name,
      head: type,
      label,
      type,
    }
    this.#meta.components.push(this.#component)
  }

  head(head: string) {
    this.#component.head = head
    return this
  }

  /**
   * setting belongto zone
   * @param z
   * @returns
   */
  belongTo(z: ZoneBuilder) {
    const name = zoneWeakMap.get(z)!
    const zone = this.#meta.zones.find((zone) => zone.id === name)
    zone?.components.push(this.#component)

    const index = this.#meta.components.findIndex((c) => c.id === this.#name)
    this.#meta.components.splice(index, 1)

    return this
  }

  link(
    c: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    c = Array.isArray(c) ? c : [c]
    const to = c.map((c) => c.#name)

    const link = { from: this.#name, to }
    fn && fn(new LinkBuilder(link))

    this.#meta.links.push(link)
    return this
  }

  vlink(
    c: ComponentBuilder | Array<ComponentBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    c = Array.isArray(c) ? c : [c]
    const to = c.map((c) => c.#name)

    const link = { from: this.#name, to }
    fn && fn(new LinkBuilder(link))

    this.#meta.vlinks.push(link)
    return this
  }

  /**
   * setting relation with interface
   * @param i
   */
  rel(i: ComponentBuilder | Array<ComponentBuilder>) {
    i = Array.isArray(i) ? i : [i]
    const to = i.map((i) => componentWeakMap.get(i)!)
    this.#meta.rels.push({ from: this.#name, to })

    return this
  }
}
