import { Builder } from '../../base'
import {
  DeploymentContainer,
  DeploymentLangAst,
  DeploymentZoneStyle,
} from '../../types'
import { ComponentBuilder, componentWeakMap } from './component'

export type ZoneBuilderMeta = Pick<DeploymentLangAst, 'zones' | 'components'>
export const zoneWeakMap: WeakMap<ZoneBuilder, string> = new WeakMap()

export class ZoneBuilder extends Builder {
  #meta: ZoneBuilderMeta
  #name: string
  #zone: DeploymentContainer

  constructor(meta: ZoneBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = 'z_' + this.id(label)
    zoneWeakMap.set(this, this.#name)

    this.#zone = {
      id: this.#name,
      head: '',
      label,
      type: 'component',
      children: [],
    }
    this.#meta.zones.push(this.#zone)
  }

  /**
   *  setting style of zone
   * @param t
   */
  type(t: DeploymentZoneStyle) {
    this.#zone.type = t
    if (!this.#zone.head) {
      this.#zone.head = t
    }
    return this
  }

  /**
   * set children
   * @param children
   */
  has(children: ComponentBuilder | Array<ComponentBuilder>) {
    children = Array.isArray(children) ? children : [children]
    for (let child of children) {
      const name = componentWeakMap.get(child)!
      const index = this.#meta.components.findIndex((c) => c.id === name)
      this.#zone.children.push(this.#meta.components[index]!)
      this.#meta.components.splice(index, 1)
    }

    return this
  }
}
