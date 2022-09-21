import { Emitter } from '../base'
import { DeploymentLangAst } from '../types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitCode() {
    const {
      config,
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
      .str(`!theme ${config!.theme}`)
      .str('')
      .forStr(
        actors,
        (s, v) => s.str(`actor :${v.label}: <<${v.title}>>`),
        actors.length > 0 ? '\n' : '',
      )
      .forStr(
        artifacts,
        (s, v) => s.str(`artifact (${v.label}) <<${v.label}>>`),
        artifacts.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        (s, v) => s.str(`database (${v.label}) <<${v.title}>>`),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(
        queues,
        (s, v) => s.str(`queue (${v.label}) <<${v.title}>>`),
        queues.length > 0 ? '\n' : '',
      )
      .forStr(
        stacks,
        (s, v) => s.str(`stack (${v.label}) <<${v.title}>>`),
        stacks.length > 0 ? '\n' : '',
      )
      .forStr(
        boundary,
        (s, v) => s.str(`boundary (${v.label}) <<${v.title}>>`),
        stacks.length > 0 ? '\n' : '',
      )
      .forStr(
        infs,
        (s, v) => s.str(`interface (${v.label}) <<${v.title}>>`),
        infs.length > 0 ? '\n' : '',
      )
      .forStr(
        hexagons,
        (s, v) => s.str(`hexagon (${v.label}) <<${v.title}>>`),
        hexagons.length > 0 ? '\n' : '',
      )
      .forStr(
        controls,
        (s, v) => s.str(`control (${v.label}) <<${v.title}>>`),
        controls.length > 0 ? '\n' : '',
      )
      .forStr(
        components,
        (s, v) => s.str(`component (${v.label}) <<${v.title}>>`),
        components.length > 0 ? '\n' : '',
      )
      .forStr(
        clouds,
        (s, v) => s.str(`cloud (${v.label}) <<${v.title}>>`),
        clouds.length > 0 ? '\n' : '',
      )
      .forStr(
        nodes,
        (s, v) => s.str(`cloud (${v.label}) <<${v.title}>>`),
        nodes.length > 0 ? '\n' : '',
      )
      .str('@enduml')
      .toString('\n')
  }
}
