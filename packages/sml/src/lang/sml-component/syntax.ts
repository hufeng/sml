import { Lang } from '../base'
import { ComponentContainer, SmlComponentAst } from '../types'

class ContainerBuilder {
  constructor(private meta: ComponentContainer) {}

  interface(label: string, name?: string) {
    this.meta.infs.push({ label, name })
    return this
  }

  component(label: string, name?: string) {
    this.meta.components.push({ label, name })
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

  package(label: string, fn?: (p: ContainerBuilder) => void) {
    return this.#container(label, 'packages', fn)
  }

  node(label: string, fn?: (n: ContainerBuilder) => void) {
    return this.#container(label, 'nodes', fn)
  }

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
   * @param name
   * @returns
   */
  component(label: string, name?: string) {
    this.meta.components.push({ label, name })
    return this
  }

  /**
   * 设置interface元素
   * @param label
   * @param name
   * @returns
   */
  interface(label: string, name?: string) {
    this.meta.infs.push({ label, name })
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