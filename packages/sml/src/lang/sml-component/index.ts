import { PumlComponentEmitter } from './emitter'
import { SmlComponentLang } from './syntax'

export function ComponentDiagram(
  title: string,
  fn: (ml: SmlComponentLang) => void,
) {
  const ast = {
    title,

    zones: [],
    nodes: [],
    databases: [],
    clouds: [],

    components: [],
    infs: [],

    notes: [],
    vlinks: [],
    links: [],
    rels: [],
  }
  fn(new SmlComponentLang(ast))
  return { ast, emitter: new PumlComponentEmitter(ast) }
}
