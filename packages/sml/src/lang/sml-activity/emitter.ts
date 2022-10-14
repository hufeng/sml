import S from '../s'
import { Emitter } from '../base'
import { Component, SmlActivityLangMeta } from './types'

export class PumlActivityEmitter extends Emitter<SmlActivityLangMeta> {
  emitPuml() {
    const { components, links, vlinks, notes } = this.meta

    return this.s
      .$reset()
      .$s('@startuml')
      .$s(this.buildTheme)
      .$s('')
      .$for(components, this.buildComponents)
      .$s('')
      .$for(links, this.buildLinks('->'))
      .$for(vlinks, this.buildLinks('-->'))
      .$for(notes, this.buildNotes)
      .$s('')
      .$s('@enduml')
      .toString()
  }

  buildComponents(s: S, c: Component) {
    s.$s(`${c.type} "${c.label}" as ${c.id}`)
  }
}
