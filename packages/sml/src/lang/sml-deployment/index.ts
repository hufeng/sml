import { PumlDeploymentEmitter } from './emitter'
import { SmlDeploymentLang } from './syntax'

export function DeploymentDiagram(
  title: string,
  fn: (ml: SmlDeploymentLang) => void,
) {
  const ast = {
    title,

    zones: [],
    components: [],

    links: [],
    vlinks: [],
    rels: [],
    notes: [],
  }

  fn(new SmlDeploymentLang(ast))

  return { ast, emitter: new PumlDeploymentEmitter(ast) }
}
