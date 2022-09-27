import { Builder } from '../../base'
import { ComponentBuilder, componentWeakMap } from './component'
import {
  DeploymentLangAst,
  DeploymentContainer,
  DeploymentZoneStyle,
} from '../types'

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
      head: 'zone',
      label,
      type: 'component',
      components: [],
    }
    this.#meta.zones.push(this.#zone)
  }

  head(head: string) {
    this.#zone.head = head
  }

  /**
   *  setting style of zone
   * @param t
   */
  type(t: DeploymentZoneStyle) {
    this.#zone.type = t
    if (this.#zone.head === 'zone') {
      this.#zone.head = t
    }
    return this
  }

  /**
   * set children
   * @param children
   */
  has(...children: Array<ComponentBuilder>) {
    children = Array.isArray(children) ? children : [children]
    for (let child of children) {
      const name = componentWeakMap.get(child)!
      const index = this.#meta.components.findIndex((c) => c.id === name)
      this.#zone.components.push(this.#meta.components[index]!)
      this.#meta.components.splice(index, 1)
    }
    return this
  }
}
