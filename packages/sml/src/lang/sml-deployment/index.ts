import { PumlDeploymentEmitter } from './emitter'
import { SmlDeploymentLang } from './syntax'

export function DeploymentDiagram(
  title: string,
  fn: (ml: SmlDeploymentLang) => void,
) {
  const ast = {
    title,
    artifacts: [],
    clouds: [],
    components: [],
    databases: [],
    nodes: [],
    queues: [],
    stacks: [],
    actors: [],
    boundary: [],
    infs: [],
    hexagons: [],
    controls: [],
  }

  fn(new SmlDeploymentLang(ast))

  return { ast, emitter: new PumlDeploymentEmitter(ast) }
}
