import { Builder, LinkBuilder } from '../../base'
import { ObjectBuilder, objectWeakMap } from './object'
import { MapNode, ObjectDiagramAst, ObjectId } from '../types'

export const mapWeakMap: WeakMap<MapBuilder, ObjectId> = new WeakMap()

export class MapBuilder extends Builder {
  #map: MapNode
  #meta: ObjectDiagramAst
  #id: string

  constructor(meta: ObjectDiagramAst, label: string) {
    super()
    this.#meta = meta

    const id = `o_` + this.id(label)
    this.#id = id
    mapWeakMap.set(this, id)
    this.#map = {
      id,
      label,
      fields: [],
    }
    this.#meta.map.push(this.#map)
  }

  field(key: string, val: string | ObjectBuilder) {
    if (typeof val === 'string') {
      this.#map.fields.push({ key, val, arrow: '=>' })
    } else {
      this.#map.fields.push({
        key,
        val: objectWeakMap.get(val)!,
        arrow: '*-->',
      })
    }

    return this
  }

  link(
    o: MapBuilder | Array<MapBuilder>,
    field?: string,
    fn?: (l: LinkBuilder) => void,
  ) {
    o = Array.isArray(o) ? o : [o]
    const to = o.map((o) => (field ? o.#id + '::' + field : o.#id))
    const link = { from: this.#id, to }
    fn && fn(new LinkBuilder(link))
    this.#meta.links.push(link)

    return this
  }
}
