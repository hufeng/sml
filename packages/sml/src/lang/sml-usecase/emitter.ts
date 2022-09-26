import { Emitter } from '../base'
import { UseCaseDiagramAst } from './types'

export class PumlUseCaseEmitter extends Emitter<UseCaseDiagramAst> {
  emitCode() {
    const { actors, usecases, zones, links, notes } = this.meta

    return (
      this.s
        // start
        .$s('@startuml')
        .$fn(this.buildConfig)
        // actors
        .$for(actors, (s, v) => s.$s(`actor :${v.label}: as ${v.name}`))
        // usecases
        .$for(usecases, (s, v) => s.$s(`usecase (${v.label}) as ${v.name}`).$s)
        // domains
        .$for(zones, (s, r) => {
          s.$s(`rectangle ${r.label.replace(/ /g, '_')} {`)
          s.$for(r.usecases, (s, uc) =>
            s.$s(`  usecase "${uc.label}" as ${uc.name}`),
          ).$for(r.actors, (s, actor) =>
            s.$s(`actor :${actor.label}: as ${actor.name}`),
          )
          s.$s('}')
        })
        // notes
        .$fors(notes, (s, note) => {
          const { label, position, on } = note
          s.$s(`note ${position} of (${on})`).$s(`  ${label}`).$s('end note')
        })
        //links
        .$fors(links, this.buildLink)
        //end
        .$s('@enduml')
        .toString('\n')
    )
  }
}
