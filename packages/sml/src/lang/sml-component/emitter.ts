import S from '../s'
import { Emitter } from '../base'
import { LinkAst, SmlComponentAst } from '../types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const {
      zones,
      clouds,
      databases,
      nodes,
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
      .$for(zones, (s, v) =>
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
      .$for(links, this.link)
      .$for(vlinks, this.link)
      .$for(rels, (s, v) => s.$s(`${v.from} - ${v.to}`))
      .$s('@enduml')
      .toString('\n')
  }

  container(name: 'component' | 'interface') {
    return (s: S, v: { label: string; id?: string }) => {
      return s.$s(`  ${name} "${v.label}"${v.id ? '  as ' + v.id : ''}`)
    }
  }

  link(s: S, { from, to, note }: LinkAst) {
    if (typeof note !== 'undefined') {
      s.$for(to, (s, to, i) =>
        s
          .$s(`note "${note.label}" as N${i}`)
          .$s(`(${from}) -- N${i}`)
          .$s(`N${i} --> (${to})`),
      )
    } else {
      s.$for(to, (s, to) => s.$s(`${from} --> ${to}`))
    }
  }
}
