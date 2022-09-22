import Builder from '../../common/builder'
import { Emitter } from '../base'
import { DeploymentBase, DeploymentLangAst } from '../types'

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
      links,
      vlinks,
      rels,
    } = this.meta

    return this.s
      .str('@startuml')
      .thunk(this.buildConfig)
      .str('')
      .forStr(actors, this.build('actor'), actors.length > 0 ? '\n' : '')
      .forStr(
        artifacts,
        this.build('artifact'),
        artifacts.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        this.build('database'),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(queues, this.build('queue'), queues.length > 0 ? '\n' : '')
      .forStr(stacks, this.build('stack'), stacks.length > 0 ? '\n' : '')
      .forStr(boundary, this.build('boundary'), stacks.length > 0 ? '\n' : '')
      .forStr(infs, this.build('interface'), infs.length > 0 ? '\n' : '')
      .forStr(hexagons, this.build('hexagon'), hexagons.length > 0 ? '\n' : '')
      .forStr(controls, this.build('control'), controls.length > 0 ? '\n' : '')
      .forStr(
        components,
        this.build('component'),
        components.length > 0 ? '\n' : '',
      )
      .forStr(clouds, this.build('cloud'), clouds.length > 0 ? '\n' : '')
      .forStr(nodes, this.build('node'), nodes.length > 0 ? '\n' : '')
      .forStr(links, (s, v) => s.str(`${v.from} --> ${v.to}`))
      .forStr(vlinks, (s, v) => s.str(`${v.from} ..> ${v.to}`))
      .forStr(rels, (s, v) => s.str(`${v.from} - ${v.to}`))
      .str('@enduml')
      .toString('\n')
  }

  build(
    name:
      | 'node'
      | 'cloud'
      | 'component'
      | 'control'
      | 'hexagon'
      | 'interface'
      | 'boundary'
      | 'stack'
      | 'queue'
      | 'actor'
      | 'artifact'
      | 'database',
  ) {
    return (s: Builder, v: DeploymentBase) =>
      s.str(
        `${name} "${v.label}"${v.name ? ' as ' + v.name : ''} <<${v.title}>>`,
      )
  }
}
