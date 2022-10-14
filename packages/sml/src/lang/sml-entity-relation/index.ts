import { PumlEntityRelationEmitter } from './emitter'
import { SmlEntityRelationLang } from './syntax'

//~~~~~~~~~~~~ factory ~~~~~~~~~~~~~~~
export function EntityRelationDiagram(
  title: string,
  fn: (ml: SmlEntityRelationLang) => void,
) {
  const ast = {
    title: title,
    entities: [],
    relations: [],
  }

  fn(new SmlEntityRelationLang(ast))

  return {
    ast,
    emitter: new PumlEntityRelationEmitter(ast),
  }
}
