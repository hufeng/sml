import { PumlActivityEmitter } from './emitter'
import { SmlActivityLang } from './syntax'

export function SmlActivityDiagram(
  title: string,
  fn: (ml: SmlActivityLang) => void,
) {
  const ast = {
    title,
    components: [],
    links: [],
    vlinks: [],
    notes: [],
  }

  fn(new SmlActivityLang(ast))

  return { ast, emitter: new PumlActivityEmitter(ast) }
}
