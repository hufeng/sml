import { Lang } from '../base'
import { ComponentContainer, SmlComponentAst } from '../types'

class ContainerBuilder {
  constructor(private meta: ComponentContainer) {}

  /**
   * 设置interface元素
   * @param label
   * @param id
   * @returns
   */
  interface(label: string, id?: string) {
    this.meta.infs.push({ label, id })
    return this
  }

  /**
   * 设置component元素
   * @param label
   * @param id
   * @returns
   */
  component(label: string, id?: string) {
    this.meta.components.push({ label, id })
    return this
  }
}

export class SmlComponentLang extends Lang<SmlComponentAst> {
  constructor(meta: SmlComponentAst) {
    super(meta)
  }

  #container(
    label: string,
    collections: 'packages' | 'nodes' | 'databases' | 'clouds',
    fn?: (c: ContainerBuilder) => void,
  ) {
    const ast = {
      label,
      components: [],
      infs: [],
    }
    fn && fn(new ContainerBuilder(ast))
    this.meta[collections].push(ast)
    return this
  }

  /**
   * 设置package容器
   * @param label
   * @param fn
   * @returns
   */
  package(label: string, fn?: (p: ContainerBuilder) => void) {
    return this.#container(label, 'packages', fn)
  }

  /**
   * 设置node节点
   * @param label
   * @param fn
   * @returns
   */
  node(label: string, fn?: (n: ContainerBuilder) => void) {
    return this.#container(label, 'nodes', fn)
  }

  /**
   * 设置数据库节点
   * @param label
   * @param fn
   * @returns
   */
  database(label: string, fn?: (d: ContainerBuilder) => void) {
    return this.#container(label, 'databases', fn)
  }

  /**
   * 生成一个☁️包裹的作用域
   * @param label
   * @param fn
   * @returns
   */
  cloud(label: string, fn?: (c: ContainerBuilder) => void) {
    return this.#container(label, 'clouds', fn)
  }

  /**
   * 设置component元素
   * @param label
   * @param id
   * @returns
   */
  component(label: string, id?: string) {
    this.meta.components.push({ label, id })
    return this
  }

  /**
   * 设置interface元素
   * @param label
   * @param id
   * @returns
   */
  interface(label: string, id?: string) {
    this.meta.infs.push({ label, id })
    return this
  }

  // ~~~~~~~~~ relations ~~~~~~~~~~~~

  /**
   * 直线箭头link
   * @param from
   * @param to
   * @returns
   */
  link(from: string, to: string) {
    this.meta.links.push({ from, to })
    return this
  }

  /**
   * 虚线箭头link
   * @param from
   * @param to
   * @returns
   */
  vlink(from: string, to: string) {
    this.meta.vlinks.push({ from, to })
    return this
  }

  /**
   * 关联元素 - 直线无箭头
   * @param from
   * @param to
   * @returns
   */
  rel(from: string, to: string) {
    this.meta.rels.push({ from, to })
    return this
  }
}
