import { Emitter } from '../base'
import { SmlComponentAst } from '../types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const {
      packages,
      nodes,
      clouds,
      databases,
      components,
      infs,
      links,
      vlinks,
      rels,
    } = this.meta

    return this.s
      .str('@startuml')
      .forStr(
        packages,
        (s, v) =>
          s
            .str(`  package "${v.title}" {`)
            .forStr(v.components, (s, v) =>
              s.str(
                `    component "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .forStr(v.infs, (s, v) =>
              s.str(
                `    interface "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .str('  }'),
        packages.length > 0 ? '\n' : '',
      )
      .forStr(
        nodes,
        (s, v) =>
          s
            .str(`  node "${v.title}" {`)
            .forStr(v.components, (s, v) =>
              s.str(
                `   component "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .forStr(v.infs, (s, v) =>
              s.str(
                `    interface "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .str(' }'),
        nodes.length > 0 ? '\n' : '',
      )
      .forStr(
        clouds,
        (s, v) =>
          s
            .str(`  cloud "${v.title}" {`)
            .forStr(v.components, (s, v) =>
              s.str(
                `    component "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .forStr(v.infs, (s, v) =>
              s.str(
                `    interface "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .str('  }'),
        clouds.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        (s, v) =>
          s
            .str(`  database "${v.title}" {`)
            .forStr(v.components, (s, v) =>
              s.str(
                `    component "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .forStr(v.infs, (s, v) =>
              s.str(
                `    interface "${v.title}"${v.name ? '  as ' + v.name : ''}`,
              ),
            )
            .str('  }'),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(components, (s, v) =>
        s.str(`  component "${v.title}"${v.name ? '  as ' + v.name : ''}`),
      )
      .forStr(
        infs,
        (s, v) =>
          s.str(`  interface "${v.title}"${v.name ? '  as ' + v.name : ''}`),
        infs.length > 0 ? '\n' : '',
      )
      .forStr(links, (s, v) => s.str(`  ${v.from} --> ${v.to}`))
      .forStr(vlinks, (s, v) => s.str(`  ${v.from} ..> ${v.to}`))
      .forStr(rels, (s, v) => s.str(`  ${v.from} - ${v.to}`))
      .str('@enduml')
      .toString('\n')
  }
}
