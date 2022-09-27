import S from '../s'
import { Emitter } from '../base'
import { SmlComponentAst } from './types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const { title, zones, components, infs, links, vlinks, rels, notes } =
      this.meta

    return this.s
      .reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
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
      .$for(notes, this.buildNotes)
      .$for(links, this.buildVLink)
      .$for(vlinks, this.buildVLink)
      .$for(rels, this.buildRels)
      .$s('@enduml')
      .toString()
  }

  container(name: 'component' | 'interface') {
    return (s: S, v: { label: string; id?: string }) => {
      return s.$s(`  ${name} "${v.label}"${v.id ? '  as ' + v.id : ''}`)
    }
  }
}
