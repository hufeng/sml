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
    this.meta.id = name
    return this
  }

  /**
   * 容器内设置database样式
   * @param label
   * @param id
   * @returns
   */
  database(label: string, id?: string) {
    this.meta.databases.push({ label, id, title: 'database' })
    return this
  }

  /**
   * 设置容器内队列元素
   * @param label
   * @param id
   * @returns
   */
  queue(label: string, id?: string) {
    this.meta.queues.push({ label, id, title: 'queue' })
    return this
  }

  /**
   * 设置容器内栈元素
   * @param label
   * @param id
   * @returns
   */
  stack(label: string, id?: string) {
    this.meta.stacks.push({ label, id, title: 'stack' })
    return this
  }

  /**
   * 设置容器内边界元素
   * @param label
   * @param id
   * @returns
   */
  boundary(label: string, id?: string) {
    this.meta.boundary.push({ label, id, title: 'boundary' })
    return this
  }

  /**
   * 设置容器内接口元素
   * @param label
   * @param id
   * @returns
   */
  interface(label: string, id?: string) {
    this.meta.infs.push({ label, id, title: 'interface' })
    return this
  }

  /**
   * 设置容器内六边形元素
   * @param label
   * @param id
   * @returns
   */
  hexagon(label: string, id?: string) {
    this.meta.hexagons.push({ label, id, title: '' })
    return this
  }

  /**
   * 设置容器内的控制元素
   * @param label
   * @param id
   * @returns
   */
  control(label: string, id?: string) {
    this.meta.controls.push({ label, id, title: 'control' })
    return this
  }

  /**
   * 设置容器内的node节点
   * @param label
   * @param id
   * @returns
   */
  node(label: string, id?: string) {
    this.meta.nodes.push({ label, id, title: 'node' })
    return this
  }

  /**
   * 设置容器的集合元素
   * @param label
   * @param id
   * @returns
   */
  collections(label: string, id?: string) {
    this.meta.collections.push({ label, id, title: 'collections' })
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
      id: '',
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
   * @param id
   * @returns
   */
  queue(label: string, id?: string) {
    this.meta.queues.push({ title: 'queue', label, id })
    return this
  }

  /**
   * 设置栈元素
   * @param label
   * @param id
   * @returns
   */
  stack(label: string, id?: string) {
    this.meta.stacks.push({ title: 'stack', label, id: id })
    return this
  }

  /**
   * 设置actor元素
   * @param label
   * @param id
   * @returns
   */
  actor(label: string, id?: string) {
    this.meta.actors.push({ title: 'actor', label, id })
    return this
  }

  /**
   * 设置边界元素
   * @param label
   * @param id
   * @returns
   */
  boundary(label: string, id?: string) {
    this.meta.boundary.push({ title: 'boundary', label, id })
    return this
  }

  /**
   * 设置接口元素
   * @param label
   * @param id
   * @returns
   */
  interface(label: string, id?: string) {
    this.meta.infs.push({ title: 'interface', label, id })
    return this
  }

  /**
   * 设置六边形元素
   * @param label
   * @param id
   * @returns
   */
  hexagon(label: string, id?: string) {
    this.meta.hexagons.push({ title: '', label, id })
    return this
  }

  /**
   * 设置六边形元素
   * @param label
   * @param id
   * @returns
   */
  control(label: string, id?: string) {
    this.meta.controls.push({ title: 'control', label, id })
    return this
  }

  /**
   * 设置集合元素
   * @param label
   * @param id
   * @returns
   */
  collections(label: string, id?: string) {
    this.meta.collections.push({ title: '', label, id })
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
