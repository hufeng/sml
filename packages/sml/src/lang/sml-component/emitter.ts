import S from '../../common/s'
import { Emitter } from '../base'
import { SmlComponentAst } from '../types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const {
      packages,
      nodes,
      clouds,
      databases,
      components,
      infs,
      links,
      vlinks,
      rels,
    } = this.meta

    return this.s
      .$s('@startuml')
      .$fn(this.buildConfig)
      .$s('')
      .$for(packages, (s, v) =>
        s
          .$s(`package "${v.label}" {`)
          .$for(v.components, this.container('component'))
          .$for(v.infs, this.container('interface'))
          .$s('}'),
      )
      .$for(nodes, (s, v) =>
        s
          .$s(`node "${v.label}" {`)
          .$for(v.components, this.container('component'))
          .$for(v.infs, this.container('interface'))
          .$s('}'),
      )
      .$for(clouds, (s, v) =>
        s
          .$s(`cloud "${v.label}" {`)
          .$for(v.components, this.container('component'))
          .$for(v.infs, this.container('interface'))
          .$s('}'),
      )
      .$for(databases, (s, v) =>
        s
          .$s(`database "${v.label}" {`)
          .$for(v.components, this.container('component'))
          .$for(v.infs, this.container('interface'))
          .$s('}'),
      )
      .$for(components, this.container(`component`))
      .$for(infs, this.container(`interface`))
      .$for(links, (s, v) => s.$s(`${v.from} --> ${v.to}`))
      .$for(vlinks, (s, v) => s.$s(`${v.from} ..> ${v.to}`))
      .$for(rels, (s, v) => s.$s(`${v.from} - ${v.to}`))
      .$s('@enduml')
      .toString('\n')
  }

  container(name: 'component' | 'interface') {
    return (s: S, v: { label: string; id?: string }) =>
      s.$s(`  ${name} "${v.label}"${v.id ? '  as ' + v.id : ''}`)
  }
}
