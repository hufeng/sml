import { Emitter } from '../base'
import S from '../s'
import { ComponentNode, UseCaseDiagramAst } from './types'

export class PumlUseCaseEmitter extends Emitter<UseCaseDiagramAst> {
  emitPuml() {
    const { title, components, zones, vlinks, rels, links, notes } = this.meta

    return (
      this.s
        .$reset()
        // start
        .$s(`@startuml ${title.replace(/ /g, '_')}`)
        .$s(this.buildConfig)
        // usecases
        .$for(components, this.buildComponent())
        // domains
        .$for(zones, (s, v) => {
          s.$s(`${v.type} ${v.label.replace(/ /g, '_')}${v.stereotypes ? ` <<${v.stereotypes}>>` : ''} {`)
          s.$for(v.components, this.buildComponent('  '))
          s.$s('}')
        })
        .$s('')
        //links
        .$for(links, this.buildLinks())
        .$for(vlinks, this.buildLinks('..>'))
        .$for(rels, this.buildLinks('--'))
        // notes
        .$for(notes, this.buildNotes)
        .$s('')
        //end
        .$s('@enduml')
        .toString()
    )
  }

  buildComponent =
    (indent: '  ' | '' = '') =>
    (s: S, v: ComponentNode) => {
      s.$s(`${indent}${v.type} "${v.label}" as ${v.id}${v.stereotypes ? ` <<${v.stereotypes}>>` : ''}`)
    }
}
