import { SmlObjectEmitter } from './emitter'
import { SmlObjectLang } from './syntax'

export function ObjectDiagram(title: string, fn: (ml: SmlObjectLang) => void) {
  const ast = {
    title,
    obj: [],
    map: [],
    exts: [],
    compose: [],
    aggrate: [],
    links: [],
    vlinks: [],
    rels: [],
  }

  fn(new SmlObjectLang(ast))

  return { ast, emitter: new SmlObjectEmitter(ast) }
}
