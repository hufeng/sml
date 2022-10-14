import { Relation } from '../type'

export class RelationBuilder {
  #relation: Relation

  constructor(relation: Relation) {
    this.#relation = relation
  }

  commonOf(comment: string) {
    this.#relation.comment = comment
  }
}
