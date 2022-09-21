import { Emitter } from '../base'
import { DeploymentLangAst } from '../types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitCode() {
    const {
      actors,
      artifacts,
      databases,
      queues,
      stacks,
      boundary,
      infs,
      hexagons,
      controls,
      components,
      clouds,
      nodes,
    } = this.meta

    return this.s
      .str('@startuml')
      .forStr(actors, (s, v) => s.str(`actor :${v.label}: <<${v.title}>>`))
      .forStr(artifacts, (s, v) =>
        s.str(`artifact (${v.label}) <<${v.label}>>`),
      )
      .forStr(databases, (s, v) =>
        s.str(`database (${v.label}) <<${v.title}>>`),
      )
      .forStr(queues, (s, v) => s.str(`queue (${v.label}) <<${v.title}>>`))
      .forStr(stacks, (s, v) => s.str(`stack (${v.label}) <<${v.title}>>`))
      .forStr(boundary, (s, v) => s.str(`boundary (${v.label}) <<${v.title}>>`))
      .forStr(infs, (s, v) => s.str(`interface (${v.label}) <<${v.title}>>`))
      .forStr(hexagons, (s, v) => s.str(`hexagon (${v.label}) <<${v.title}>>`))
      .forStr(controls, (s, v) => s.str(`control (${v.label}) <<${v.title}>>`))
      .forStr(components, (s, v) =>
        s.str(`component (${v.label}) <<${v.title}>>`),
      )
      .forStr(clouds, (s, v) => s.str(`cloud (${v.label}) <<${v.title}>>`))
      .forStr(nodes, (s, v) => s.str(`cloud (${v.label}) <<${v.title}>>`))
      .str('@enduml')
      .toString('\n')
  }
}
