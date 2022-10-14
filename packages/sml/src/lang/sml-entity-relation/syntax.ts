import { Lang } from '../base'
import { EntityBuilder, RelType } from './builder/entity'
import { EntityRelationDiagramAst } from './type'

export class SmlEntityRelationLang extends Lang<EntityRelationDiagramAst> {
  constructor(meta: EntityRelationDiagramAst) {
    super(meta)
  }

  get t() {
    return RelType
  }

  entity(label: string) {
    return new EntityBuilder(this.meta, label)
  }
}
