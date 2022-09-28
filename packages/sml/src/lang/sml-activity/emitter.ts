import S from '../s'
import { Emitter } from '../base'
import { Component, SmlActivityLangMeta } from './types'

export class PumlActivityEmitter extends Emitter<SmlActivityLangMeta> {
  emitCode() {
    const { components, links, vlinks, notes } = this.meta

    return this.s
      .$reset()
      .$s('@startuml')
      .$fn(this.buildTheme)
      .$fors(components, this.buildComponents)
      .$fors(links, this.buildLinks('->'))
      .$fors(vlinks, this.buildVlink('-->'))
      .$fors(notes, this.buildNotes)
      .$s('@enduml')
      .toString()
  }

  buildComponents(s: S, c: Component) {
    s.$s(`${c.type} "${c.label}" as ${c.id}`)
  }
}
