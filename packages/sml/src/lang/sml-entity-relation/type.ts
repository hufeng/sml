import { BaseAst } from '../types'

export type EntityField = {
  name: string
  type: string
  stereotypes: string
}

export interface Entity {
  id: string
  label: string
  ids: Array<EntityField>
  fields: Array<EntityField>
}

export interface Relation {
  from: string
  to: Array<string>
  comment?: string
  type: string
}

export interface EntityRelationDiagramAst extends BaseAst {
  entities: Array<Entity>
  relations: Array<Relation>
}
