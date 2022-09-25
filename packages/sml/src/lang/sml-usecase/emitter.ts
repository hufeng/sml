import { Emitter } from '../base'
import { UseCaseDiagramAst } from '../types'

export class PumlUseCaseEmitter extends Emitter<UseCaseDiagramAst> {
  emitCode() {
    const { actors, usecases, zones, links, notes } = this.meta

    return (
      this.s
        // start
        .str('@startuml')
        .thunk(this.buildTheme)
        // actors
        .forStr(
          actors,
          (s, v) => s.str(`actor :${v.label}: as ${v.name}`),
          actors.length > 0 ? '\n' : '',
        )
        // usecases
        .forStr(
          usecases,
          (s, v) => s.str(`usecase (${v.label}) as ${v.name}`).str,
          usecases.length > 0 ? '\n' : '',
        )
        // domains
        .forStr(
          zones,
          (s, r) => {
            s.str(`rectangle ${r.label.replace(/ /g, '_')} {`)
            s.forStr(r.usecases, (s, uc) =>
              s.str(`  usecase "${uc.label}" as ${uc.name}`),
            ).forStr(r.actors, (s, actor) =>
              s.str(`actor :${actor.label}: as ${actor.name}`),
            )
            s.str('}')
          },
          zones.length > 0 ? '\n' : '',
        )
        // notes
        .forStr(
          notes,
          (s, note) => {
            const { label, position, on } = note
            s.str(`note ${position} of (${on})`)
              .str(`  ${label}`)
              .str('end note')
          },
          notes.length > 0 ? '\n' : '',
        )
        //links
        .forStr(links, (s, { from, to, link }) => {
          if (typeof link !== 'undefined') {
            s.forStr(to, (s, to, i) =>
              s
                .str(`note "${link.label}" as N${i}`)
                .str(`(${from}) -- N${i}`)
                .str(`N${i} --> (${to})`),
            )
          } else {
            s.forStr(to, (s, to) => s.str(`${from} --> ${to}`))
          }
        })
        //end
        .str('@enduml')
        .toString('\n')
    )
  }
}
