import { PumlComponentEmitter } from './emitter'
import { SmlComponentLang } from './syntax'

export function ComponentDiagram(
  title: string,
  fn: (ml: SmlComponentLang) => void,
) {
  const ast = {
    title,
    packages: [],
    nodes: [],
    databases: [],
    clouds: [],
    components: [],
    infs: [],
  }
  fn(new SmlComponentLang(ast))
  return { ast, emitter: new PumlComponentEmitter(ast) }
}
