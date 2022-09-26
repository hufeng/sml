import { Lang } from '../base'
import { SmlComponentAst } from '../types'
import { ComponentBuilder } from './builder/component'
import { InterfaceBuilder } from './builder/interface'
import { ZoneBuilder } from './builder/zone'

export class SmlComponentLang extends Lang<SmlComponentAst> {
  constructor(meta: SmlComponentAst) {
    super(meta)
  }

  /**
   * 设置package容器
   * @param label
   * @returns
   */
  zone(label: string) {
    const { zones, components, infs } = this.meta
    return new ZoneBuilder(zones, components, infs, label)
  }

  /**
   * 设置node节点
   * @param label
   * @returns
   */
  zoneNode(label: string) {
    const { nodes, components, infs } = this.meta
    return new ZoneBuilder(nodes, components, infs, label)
  }

  /**
   * 设置数据库节点
   * @param label
   * @returns
   */
  zoneDatabase(label: string) {
    const { databases, components, infs } = this.meta
    return new ZoneBuilder(databases, components, infs, label)
  }

  /**
   * 生成一个☁️包裹的作用域
   * @param label
   * @returns
   */
  zoneCloud(label: string) {
    const { clouds, components, infs } = this.meta
    return new ZoneBuilder(clouds, components, infs, label)
  }

  /**
   * 设置component元素
   * @param label
   * @returns
   */
  component(label: string) {
    return new ComponentBuilder(this.meta, label)
  }

  /**
   * 设置interface元素
   * @param label
   * @returns
   */
  interface(label: string) {
    return new InterfaceBuilder(this.meta, label)
  }
}
