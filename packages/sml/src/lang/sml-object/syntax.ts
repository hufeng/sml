import { Lang } from '../base'
import { MapBuilder } from './builder/map'
import { ObjectBuilder } from './builder/object'
import { ObjectDiagramAst } from './types'

export class SmlObjectLang extends Lang<ObjectDiagramAst> {
  constructor(meta: ObjectDiagramAst) {
    super(meta)
  }

  object(label: string) {
    return new ObjectBuilder(this.meta, label)
  }

  map(label: string) {
    return new MapBuilder(this.meta, label)
  }
}
