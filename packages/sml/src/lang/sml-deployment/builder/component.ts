import { Builder } from '../../base'
import { DeploymentBase, DeploymentLangAst } from '../../types'
import { InterfaceBuilder, interfaceWeakMap } from './interface'
import { LinkBuilder } from './link'
import { ZoneBuilder, zoneWeakMap } from './zone'

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
  #component: DeploymentBase

  constructor(
    meta: ComponentBuilderMeta,
    label: string,
    type: DeployComponentType,
  ) {
    super()
    this.#meta = meta
    this.#name = 'c_' + this.id(label)
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
    zone?.children.push(this.#component)

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
  rel(i: InterfaceBuilder | Array<InterfaceBuilder>) {
    i = Array.isArray(i) ? i : [i]
    const to = i.map((i) => interfaceWeakMap.get(i)!)
    this.#meta.rels.push({ from: this.#name, to })

    return this
  }
}
