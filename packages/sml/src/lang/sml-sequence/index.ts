import { PumlSequenceEmitter } from './emitter'
import { SmlSequenceLang } from './syntax'

export function SmlSequenceDiagram(
  title: string,
  fn: (ml: SmlSequenceLang) => void,
) {
  const ast = {
    title,
    components: [],
    links: [],
    vlinks: [],
    rels: [],
    notes: [],
  }

  fn(new SmlSequenceLang(ast))

  return { ast, emitter: new PumlSequenceEmitter(ast) }
}
