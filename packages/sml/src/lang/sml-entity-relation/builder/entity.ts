import { Builder } from '../../base'
import { Entity, EntityRelationDiagramAst, Relation } from '../type'
import { RelationBuilder } from './relation'

export const erWeakMap: WeakMap<EntityBuilder, string> = new WeakMap()

export enum RelType {
  one2one = '||--||',
  one2zeroOne = '||--o|',
  one2zeroMany = '||--o{',
  one2oneMany = '||--|{',

  zeroOne2zeroOne = '|o--o|',
  zeroOne2zeroMany = '|o--o{',

  zeroMany2zeroMany = '}|--|{',
  oneMany2oneMany = '}|--|{',
}

export class EntityBuilder extends Builder {
  #meta: EntityRelationDiagramAst
  #entity: Entity
  #id: string

  constructor(meta: EntityRelationDiagramAst, label: string) {
    super()
    this.#meta = meta
    this.#id = 'e_' + this.id(label)
    erWeakMap.set(this, this.#id)

    this.#entity = {
      id: this.#id,
      label,
      ids: [],
      fields: [],
    }
    this.#meta.entities.push(this.#entity)
  }

  primaryKey(name: string, type: string, stereotypes: string = '') {
    this.#entity.ids.push({ name, type, stereotypes })
    return this
  }

  field(name: string, type: string, stereotypes: string = '') {
    this.#entity.fields.push({ name, type, stereotypes })
    return this
  }

  rel(
    e: EntityBuilder | Array<EntityBuilder>,
    type: RelType,
    fn?: (r: RelationBuilder) => void,
  ) {
    this.buildRelation(e, type, fn)
  }

  private buildRelation(
    e: EntityBuilder | Array<EntityBuilder>,
    type: RelType,
    fn?: (r: RelationBuilder) => void,
  ) {
    const to = (Array.isArray(e) ? e : [e]).map((v) => erWeakMap.get(v)!)
    const rel = {
      from: this.#id,
      to,
      comment: '',
      type,
    } as const
    fn && fn(new RelationBuilder(rel))
    this.#meta.relations.push(rel)
  }
}
