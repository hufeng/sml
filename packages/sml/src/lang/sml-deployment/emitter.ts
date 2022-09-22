import Builder from '../../common/builder'
import { Emitter } from '../base'
import { DeploymentBase, DeploymentLangAst } from '../types'

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
      links,
      vlinks,
      rels,
    } = this.meta

    return this.s
      .str('@startuml')
      .str(`!theme ${config!.theme}`)
      .str('')
      .forStr(actors, this.container('actor'), actors.length > 0 ? '\n' : '')
      .forStr(
        artifacts,
        this.container('artifact'),
        artifacts.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        this.container('database'),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(queues, this.container('queue'), queues.length > 0 ? '\n' : '')
      .forStr(stacks, this.container('stack'), stacks.length > 0 ? '\n' : '')
      .forStr(
        boundary,
        this.container('boundary'),
        stacks.length > 0 ? '\n' : '',
      )
      .forStr(infs, this.container('interface'), infs.length > 0 ? '\n' : '')
      .forStr(
        hexagons,
        this.container('hexagon'),
        hexagons.length > 0 ? '\n' : '',
      )
      .forStr(
        controls,
        this.container('control'),
        controls.length > 0 ? '\n' : '',
      )
      .forStr(
        components,
        this.container('component'),
        components.length > 0 ? '\n' : '',
      )
      .forStr(clouds, this.container('cloud'), clouds.length > 0 ? '\n' : '')
      .forStr(nodes, this.container('node'), nodes.length > 0 ? '\n' : '')
      .forStr(links, (s, v) => s.str(`${v.from} --> ${v.to}`))
      .forStr(vlinks, (s, v) => s.str(`${v.from} ..> ${v.to}`))
      .forStr(rels, (s, v) => s.str(`${v.from} - ${v.to}`))
      .str('@enduml')
      .toString('\n')
  }

  container(
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
