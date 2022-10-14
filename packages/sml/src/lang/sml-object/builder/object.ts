import { Builder, LinkBuilder } from '../../base'
import { ObjectDiagramAst, ObjectId, ObjectNode } from '../types'
import { MapBuilder, mapWeakMap } from './map'

export const objectWeakMap: WeakMap<ObjectBuilder, ObjectId> = new WeakMap()

export class ObjectBuilder extends Builder {
  #meta: ObjectDiagramAst
  #node: ObjectNode
  #id: string

  constructor(meta: ObjectDiagramAst, label: string) {
    super()
    this.#meta = meta
    this.#id = `o_` + this.id(label)
    objectWeakMap.set(this, this.#id)
    this.#node = {
      id: this.#id,
      label,
      fields: [],
    }
    this.#meta.obj.push(this.#node)
  }

  extends(obj: ObjectBuilder, label: string = '继承') {
    const to = objectWeakMap.get(obj)!
    this.#meta.exts.push({ from: this.#id, to, label })
    return this
  }

  compose(obj: ObjectBuilder, label: string = '组合') {
    const to = objectWeakMap.get(obj)!
    this.#meta.compose.push({ from: this.#id, to, label })
    return this
  }

  aggrate(obj: ObjectBuilder, label: string = '聚合') {
    const to = objectWeakMap.get(obj)!
    this.#meta.aggrate.push({ from: this.#id, to, label })
  }

  field(name: string, val: string) {
    this.#node.fields.push({ name, val })
    return this
  }

  link(o: ObjectBuilder | Array<ObjectBuilder>, fn?: (l: LinkBuilder) => void) {
    this.buildLinks(this.#meta.links, o, fn)
    return this
  }

  vlink(
    o: ObjectBuilder | Array<ObjectBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    this.buildLinks(this.#meta.vlinks, o, fn)
    return this
  }

  rel(o: ObjectBuilder | Array<ObjectBuilder>, fn?: (l: LinkBuilder) => void) {
    this.buildLinks(this.#meta.rels, o, fn)
    return this
  }

  linkMap(o: MapBuilder, field?: string, fn?: (l: LinkBuilder) => void) {
    let to = mapWeakMap.get(o)!
    if (field) {
      to += '::' + field
    }

    const link = { from: this.#id, to: [to] }
    fn && fn(new LinkBuilder(link))
    this.#meta.links.push(link)

    return this
  }
}
