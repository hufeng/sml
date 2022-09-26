import { Lang } from '../base'
import { ZoneBuilder } from './builder/zone'
import { ComponentBuilder } from './builder/component'
import { InterfaceBuilder } from './builder/interface'
import { SmlComponentAst } from './types'

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
    return new ZoneBuilder(this.meta, label)
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
