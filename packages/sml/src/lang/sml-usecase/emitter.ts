/**
 * @prettier
 * --print-width 120
 */
import { Emitter } from '../base'
import S from '../s'
import { ComponentNode, UseCaseDiagramAst } from './types'

export class PumlUseCaseEmitter extends Emitter<UseCaseDiagramAst> {
  emitCode() {
    const { title, components, zones, vlinks, rels, links, notes } = this.meta

    return (
      this.s
        .$reset()
        // start
        .$s(`@startuml ${title.replace(/ /g, '_')}`)
        .$fn(this.buildConfig)
        // usecases
        .$for(components, this.buildComponent())
        // domains
        .$for(zones, (s, v) => {
          s.$s(`${v.type} ${v.label.replace(/ /g, '_')}${v.stereotypes ? ` <<${v.stereotypes}>>` : ''} {`)
          s.$for(v.components, this.buildComponent('  '))
          s.$s('}')
        })
        //links
        .$fors(links, this.buildLinks())
        .$fors(vlinks, this.buildVlink())
        .$fors(rels, this.buildRels)
        // notes
        .$fors(notes, this.buildNotes)
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
