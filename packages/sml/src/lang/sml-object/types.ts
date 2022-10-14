import { BaseAst, LinkAst as LinkNode } from '../types'
import { ObjectBuilder } from './builder/object'

export type ObjectId = string

export interface ObjectField {
  name: string
  val: string
}

export interface ObjectNode {
  id: string
  label: string
  fields: Array<ObjectField>
}

export interface MapField {
  key: string
  val: string | ObjectBuilder
  arrow: '=>' | '*-->'
}
export interface MapNode {
  id: string
  label: string
  fields: Array<MapField>
}

export interface ExtProp {
  from: ObjectId
  to: ObjectId
  label: string
}

export interface ObjectDiagramAst extends BaseAst {
  map: Array<MapNode>
  obj: Array<ObjectNode>
  links: Array<LinkNode>
  vlinks: Array<LinkNode>
  rels: Array<LinkNode>
  exts: Array<ExtProp>
  compose: Array<ExtProp>
  aggrate: Array<ExtProp>
}
