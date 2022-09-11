import { Emitter } from './emitter'
import { SmlUseCase, SmlUseCaseMeta } from '../lang/sml-usecase'

export class PumlUseCaseEmitter extends Emitter<SmlUseCase> {
  emitCode() {
    const meta = (this.sml as any).meta as SmlUseCaseMeta
    return (
      this.s
        // start
        .str('@startuml')
        // setting actor style
        .ifStr(
          meta.actorStyle !== 'default',
          `skinparam actorStyle ${meta.actorStyle}`,
        )
        .str(`${meta.direction.replace('->', ' to ')} direction\n`)
        // actors
        .forStr(
          meta.actors,
          (s, actor) => s.str(`actor :${actor.label}: as ${actor.name}`),
          meta.actors.length > 0 ? '\n' : '',
        )
        //usecases
        .forStr(
          meta.usecases,
          (s, usecase) =>
            s.str(`usecase (${usecase.label}) as ${usecase.name}`).str,
          meta.usecases.length > 0 ? '\n' : '',
        )
        //rects
        .forStr(
          meta.rects,
          (s, r) => {
            s.str(`rectangle ${r.label.replace(/ /g, '_')} {`)
            s.forStr(r.usecases, (s, uc) =>
              s.str(`  usecase "${uc.label}" as ${uc.name}`),
            ).forStr(r.actors, (s, actor) =>
              s.str(`actor :${actor.label}: as ${actor.name}`),
            )
            s.str('}')
          },
          meta.rects.length > 0 ? '\n' : '',
        )
        .forStr(
          meta.pkgs,
          (s, pkg) => {
            s.str(`package ${pkg.label.replace(/ /g, '_')} {`)
            s.forStr(pkg.usecases, (s, uc) =>
              s.str(`  usecase "${uc.label}" as ${uc.name}`),
            ).forStr(pkg.actors, (s, actor) =>
              s.str(`actor :${actor.label}: as ${actor.name}`),
            )
            s.str('}')
          },
          meta.pkgs.length > 0 ? '\n' : '',
        )
        //links
        .forStr(meta.links, (s, link) => {
          s.forStr(link.to, (s, to) => s.str(`${link.from} --> ${to}`))
        })
        //end
        .str('@enduml')
        .toString('\n')
    )
  }
}
