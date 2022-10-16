import S from '../s'
import { Emitter } from '../base'
import { Component, SmlSequenceLangMeta } from './types'

export class PumlSequenceEmitter extends Emitter<SmlSequenceLangMeta> {
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
