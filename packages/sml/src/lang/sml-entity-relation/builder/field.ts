import { EntityField } from '../type'

export class FieldBuilder {
  #f: EntityField

  constructor(f: EntityField) {
    this.#f = f
  }

  stereotypesOf(stereotypes: string) {
    this.#f.stereotypes = stereotypes
  }
}
