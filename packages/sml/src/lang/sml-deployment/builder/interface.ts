import { Builder } from '../../base'
import { DeploymentBase, DeploymentLangAst } from '../../types'
import { ComponentBuilder, componentWeakMap } from './component'

export type InterfaceBuilderMeta = Pick<
  DeploymentLangAst,
  'components' | 'rels'
>

export const interfaceWeakMap: WeakMap<InterfaceBuilder, string> = new WeakMap()

export class InterfaceBuilder extends Builder {
  #meta: InterfaceBuilderMeta
  #name: string
  #interface: DeploymentBase

  constructor(meta: InterfaceBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = 'i_' + this.id(label)
    interfaceWeakMap.set(this, this.#name)

    this.#interface = {
      id: this.#name,
      head: 'interface',
      label,
      type: 'interface',
    }
    this.#meta.components.push(this.#interface)
  }

  /**
   * set relation with component
   * @param c
   */
  rel(c: ComponentBuilder | Array<ComponentBuilder>) {
    c = Array.isArray(c) ? c : [c]
    const to = c.map((c) => componentWeakMap.get(c)!)
    this.#meta.rels.push({
      from: this.#name,
      to,
    })
    return this
  }
}
