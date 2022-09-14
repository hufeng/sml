import { PumlClassEmitter } from './emitter'
import { SmlClazzLang as SmlClassLang } from './syntax'

/**
 * ClassDiagram factory
 * @param title
 * @param fn
 * @returns
 */
export function ClassDiagram(title: string, fn: (ml: SmlClassLang) => void) {
  const ast = {
    title,
    clazzes: [],
    interfaces: [],
    enums: [],
    structs: [],
    protocols: [],
  }

  fn(new SmlClassLang(ast))

  return {
    ast,
    emitter: new PumlClassEmitter(ast),
  }
}
