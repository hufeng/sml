import { Lang } from '../base'
import { ComponentBuilder } from './builder/component'
import { ZoneBuilder } from './builder/zone'
import { DeploymentLangAst } from './types'

/**
 * lang
 */
export class SmlDeploymentLang extends Lang<DeploymentLangAst> {
  constructor(meta: DeploymentLangAst) {
    super(meta)
  }

  zone(label: string) {
    return new ZoneBuilder(this.meta, label)
  }

  // ~~~~~~~~~~~~~~~ baisc element ~~~~~~~~~~~~~~~~~~~~~~

  component(label: string) {
    return new ComponentBuilder(this.meta, label, 'component')
  }

  /**
   * 设置队列元素
   * @param label
   * @returns
   */
  queue(label: string) {
    return new ComponentBuilder(this.meta, label, 'queue')
  }

  /**
   * 设置栈元素
   * @param label
   * * @returns
   */
  stack(label: string) {
    return new ComponentBuilder(this.meta, label, 'stack')
  }

  /**
   * 设置actor元素
   * @param label
   * @returns
   */
  actor(label: string) {
    return new ComponentBuilder(this.meta, label, 'actor')
  }

  /**
   * 设置边界元素
   * @param label
   * @returns
   */
  boundary(label: string) {
    return new ComponentBuilder(this.meta, label, 'boundary')
  }

  /**
   * 设置接口元素
   * @param label
   * @returns
   */
  interface(label: string) {
    return new ComponentBuilder(this.meta, label, 'interface')
  }

  /**
   * 设置六边形元素
   * @param label
   * @returns
   */
  hexagon(label: string) {
    return new ComponentBuilder(this.meta, label, 'hexagon')
  }

  /**
   * 设置六边形元素
   * @param label
   * @returns
   */
  control(label: string) {
    return new ComponentBuilder(this.meta, label, 'control')
  }

  /**
   * 设置集合元素
   * @param label
   * @returns
   */
  collections(label: string) {
    return new ComponentBuilder(this.meta, label, 'collections')
  }

  artifact(label: string) {
    return new ComponentBuilder(this.meta, label, 'artifact')
  }

  cloud(label: string) {
    return new ComponentBuilder(this.meta, label, 'cloud')
  }

  database(label: string) {
    return new ComponentBuilder(this.meta, label, 'database')
  }

  node(label: string) {
    return new ComponentBuilder(this.meta, label, 'node')
  }
}
