import { Lang } from '../base'
import { DeploymentContainer, DeploymentLangAst } from '../types'

/**
 * 设置容器属性
 */
class ContainerBuilder {
  constructor(private meta: DeploymentContainer) {}

  /**
   * 设定当前容器名称，可以方便通过该标记相互link
   * @param name
   */
  name(name: string) {
    this.meta.name = name
    return this
  }

  /**
   * 容器内设置database样式
   * @param label
   * @param name
   * @returns
   */
  database(label: string, name?: string) {
    this.meta.databases.push({ label, name, title: 'database' })
    return this
  }

  /**
   * 设置容器内队列元素
   * @param label
   * @param name
   * @returns
   */
  queue(label: string, name?: string) {
    this.meta.queues.push({ label, name, title: 'queue' })
    return this
  }

  /**
   * 设置容器内栈元素
   * @param label
   * @param name
   * @returns
   */
  stack(label: string, name?: string) {
    this.meta.stacks.push({ label, name, title: 'stack' })
    return this
  }

  /**
   * 设置容器内边界元素
   * @param label
   * @param name
   * @returns
   */
  boundary(label: string, name?: string) {
    this.meta.boundary.push({ label, name, title: 'boundary' })
    return this
  }

  /**
   * 设置容器内接口元素
   * @param label
   * @param name
   * @returns
   */
  interface(label: string, name?: string) {
    this.meta.infs.push({ label, name, title: 'interface' })
    return this
  }

  /**
   * 设置容器内六边形元素
   * @param label
   * @param name
   * @returns
   */
  hexagon(label: string, name?: string) {
    this.meta.hexagons.push({ label, name, title: '' })
    return this
  }

  /**
   * 设置容器内的控制元素
   * @param label
   * @param name
   * @returns
   */
  control(label: string, name?: string) {
    this.meta.controls.push({ label, name, title: 'control' })
    return this
  }

  /**
   * 设置容器内的node节点
   * @param label
   * @param name
   * @returns
   */
  node(label: string, name?: string) {
    this.meta.nodes.push({ label, name, title: 'node' })
    return this
  }

  /**
   * 设置容器的集合元素
   * @param label
   * @param name
   * @returns
   */
  collections(label: string, name?: string) {
    this.meta.collections.push({ label, name, title: 'collections' })
    return this
  }
}

/**
 * lang
 */
export class SmlDeploymentLang extends Lang<DeploymentLangAst> {
  constructor(meta: DeploymentLangAst) {
    super(meta)
  }

  #container(
    title: string,
    label: string,
    collections: 'artifacts' | 'clouds' | 'components' | 'databases' | 'nodes',
    fn?: (a: ContainerBuilder) => void,
  ) {
    const meta = {
      title,
      label,
      name: '',
      databases: [],
      queues: [],
      stacks: [],
      boundary: [],
      infs: [],
      hexagons: [],
      controls: [],
      nodes: [],
      collections: [],
    }

    fn && fn(new ContainerBuilder(meta))
    this.meta[collections].push(meta)
    return this
  }

  // ~~~~~~~~~~~~~~~~ container ~~~~~~~~~~~~~~~~~~~~~~~~~

  /**
   * 设置artifact容器
   * @param label
   * @param fn
   * @returns
   */
  artifact(label: string, fn?: (a: ContainerBuilder) => void) {
    return this.#container('aritfact', label, 'artifacts', fn)
  }

  /**
   * 设置数据库容器
   * @param label
   * @param fn
   * @returns
   */
  database(label: string, fn?: (d: ContainerBuilder) => void) {
    return this.#container(`database`, label, 'databases', fn)
  }

  /**
   * 设置☁️容器
   * @param label
   * @param fn
   * @returns
   */
  cloud(label: string, fn?: (d: ContainerBuilder) => void) {
    return this.#container(`cloud`, label, 'clouds', fn)
  }

  /**
   * 设置组件容器
   * @param label
   * @param fn
   * @returns
   */
  component(label: string, fn?: (c: ContainerBuilder) => void) {
    return this.#container(`component`, label, 'components', fn)
  }

  /**
   * 设置node容器
   * @param label
   * @param fn
   * @returns
   */
  node(label: string, fn?: (n: ContainerBuilder) => void) {
    return this.#container(`node`, label, 'nodes', fn)
  }

  // ~~~~~~~~~~~~~~~ baisc element ~~~~~~~~~~~~~~~~~~~~~~

  /**
   * 设置队列元素
   * @param label
   * @param name
   * @returns
   */
  queue(label: string, name?: string) {
    this.meta.queues.push({ title: 'queue', label, name })
    return this
  }

  /**
   * 设置栈元素
   * @param label
   * @param name
   * @returns
   */
  stack(label: string, name?: string) {
    this.meta.stacks.push({ title: 'stack', label, name })
    return this
  }

  /**
   * 设置actor元素
   * @param label
   * @param name
   * @returns
   */
  actor(label: string, name?: string) {
    this.meta.actors.push({ title: 'actor', label, name })
    return this
  }

  /**
   * 设置边界元素
   * @param label
   * @param name
   * @returns
   */
  boundary(label: string, name?: string) {
    this.meta.boundary.push({ title: 'boundary', label, name })
    return this
  }

  /**
   * 设置接口元素
   * @param label
   * @param name
   * @returns
   */
  interface(label: string, name?: string) {
    this.meta.infs.push({ title: 'interface', label, name })
    return this
  }

  /**
   * 设置六边形元素
   * @param label
   * @param name
   * @returns
   */
  hexagon(label: string, name?: string) {
    this.meta.hexagons.push({ title: '', label, name })
    return this
  }

  /**
   * 设置六边形元素
   * @param label
   * @param name
   * @returns
   */
  control(label: string, name?: string) {
    this.meta.controls.push({ title: 'control', label, name })
    return this
  }

  /**
   * 设置集合元素
   * @param label
   * @param name
   * @returns
   */
  collections(label: string, name?: string) {
    this.meta.collections.push({ title: '', label, name })
    return this
  }

  // ~~~~~~~~~~~~~~~~~~ relation ~~~~~~~~~~~~~~~

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
