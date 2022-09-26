import S from '../s'
import { Emitter } from '../base'
import { LinkAst } from '../types'
import { SmlComponentAst } from './types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const { zones, components, infs, links, vlinks, rels } = this.meta

    return this.s
      .$s('@startuml')
      .$fn(this.buildConfig)
      .$s('')
      .$for(zones, (s, v) =>
        s
          .$s(`${v.type} "${v.label}" {`)
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
