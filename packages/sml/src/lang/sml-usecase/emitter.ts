import { Emitter } from '../base'
import { UseCaseDiagramAst } from './types'

export class PumlUseCaseEmitter extends Emitter<UseCaseDiagramAst> {
  emitCode() {
    const { title, actors, usecases, zones, links, notes } = this.meta

    return (
      this.s
        .reset()
        // start
        .$s(`@startuml ${title.replace(/ /g, '_')}`)
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
        .$fors(notes, this.buildNotes)
        //links
        .$fors(links, this.buildLinks)
        //end
        .$s('@enduml')
        .toString()
    )
  }
}
