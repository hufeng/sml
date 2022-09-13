import { Emitter } from './emitter'
import { SmlUseCase, SmlUseCaseMeta } from '../lang/sml-usecase'

export class PumlUseCaseEmitter extends Emitter<SmlUseCase> {
  emitCode() {
    const {
      config,
      actors,
      usecases,
      packages: domains,
      links,
      notes,
    } = (this.sml as any).meta as SmlUseCaseMeta

    return (
      this.s
        // start
        .str('@startuml')
        // setting actor style
        .ifStr(
          config.actorStyle !== 'default',
          `skinparam actorStyle ${config.actorStyle}`,
        )
        // setting direction
        .str(`${config.direction.replace('->', ' to ')} direction\n`)
        // actors
        .forStr(
          actors,
          (s, actor) => s.str(`actor :${actor.label}: as ${actor.name}`),
          actors.length > 0 ? '\n' : '',
        )
        // usecases
        .forStr(
          usecases,
          (s, usecase) =>
            s.str(`usecase (${usecase.label}) as ${usecase.name}`).str,
          usecases.length > 0 ? '\n' : '',
        )
        // domains
        .forStr(
          domains,
          (s, r) => {
            s.str(`rectangle ${r.label.replace(/ /g, '_')} {`)
            s.forStr(r.usecases, (s, uc) =>
              s.str(`  usecase "${uc.label}" as ${uc.name}`),
            ).forStr(r.actors, (s, actor) =>
              s.str(`actor :${actor.label}: as ${actor.name}`),
            )
            s.str('}')
          },
          domains.length > 0 ? '\n' : '',
        )
        // notes
        .forStr(
          notes,
          (s, note, i) => {
            const { label, position, on } = note
            if (typeof on === 'string') {
              s.str(`note ${position} of (${on})`)
                .str(`  ${label}`)
                .str('end note')
            } else {
              s.str(`node ${label} as N${i}`)
                .str(`(${on.from}) .. N${i}`)
                .str(`N${i} .. (${on.to})`)
            }
          },
          notes.length > 0 ? '\n' : '',
        )
        //links
        .forStr(links, (s, link) => {
          s.forStr(link.to, (s, to) => s.str(`${link.from} --> ${to}`))
        })
        //end
        .str('@enduml')
        .toString('\n')
    )
  }
}
