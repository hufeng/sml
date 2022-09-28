import S from '../s'
import { Emitter } from '../base'
import { Component, SmlComponentAst } from './types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const { title, zones, components, links, vlinks, rels, notes } = this.meta

    return this.s
      .$reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$fn(this.buildConfig)
      .$s('')
      .$for(zones, (s, v) => s.$s(`${v.type} "${v.label}" {`).$for(v.components, this.buildComponent).$s('}'))
      .$for(components, this.buildComponent)
      .$for(notes, this.buildNotes)
      .$for(links, this.buildVlink())
      .$for(vlinks, this.buildVlink())
      .$for(rels, this.buildRels)
      .$s('@enduml')
      .toString()
  }

  buildComponent(s: S, { id, type, label }: Component) {
    return s.$s(`  ${type} "${label}"  as ${id}`)
  }
}
