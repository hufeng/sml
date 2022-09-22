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
    vlinks: [],
    links: [],
    rels: [],
  }
  fn(new SmlComponentLang(ast))

  // @ts-ignore

  console.log(ast.meta)

  return { ast, emitter: new PumlComponentEmitter(ast) }
}
