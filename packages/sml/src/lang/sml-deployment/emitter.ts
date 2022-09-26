import S from '../s'
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
      .$s('@startuml')
      .$fn(this.buildConfig)
      .$s('')
      .$for(actors, this.build('actor'))
      .$for(artifacts, this.build('artifact'))
      .$for(databases, this.build('database'))
      .$for(queues, this.build('queue'))
      .$for(stacks, this.build('stack'))
      .$for(boundary, this.build('boundary'))
      .$for(infs, this.build('interface'))
      .$for(hexagons, this.build('hexagon'))
      .$for(controls, this.build('control'))
      .$for(components, this.build('component'))
      .$for(clouds, this.build('cloud'))
      .$for(nodes, this.build('node'))
      .$for(links, (s, v) => s.$s(`${v.from} --> ${v.to}`))
      .$for(vlinks, (s, v) => s.$s(`${v.from} ..> ${v.to}`))
      .$for(rels, (s, v) => s.$s(`${v.from} - ${v.to}`))
      .$s('@enduml')
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
    return (s: S, v: DeploymentBase) =>
      s.$s(`${name} "${v.label}"${v.id ? ' as ' + v.id : ''} <<${v.title}>>`)
  }
}
