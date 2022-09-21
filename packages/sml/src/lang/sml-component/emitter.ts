import { Emitter } from '../base'
import { SmlComponentAst } from '../types'

export class PumlComponentEmitter extends Emitter<SmlComponentAst> {
  emitCode() {
    const { packages, nodes, clouds, databases, components, infs } = this.meta

    return this.s
      .str('@startuml')
      .forStr(
        packages,
        (s, v) =>
          s
            .str(`  package "${v.title}" {`)
            .forStr(v.components, (s, v) => s.str(`    component "${v.title}"`))
            .forStr(v.infs, (s, v) => s.str(`   interface "${v.title}"`))
            .str('  }'),
        packages.length > 0 ? '\n' : '',
      )
      .forStr(
        nodes,
        (s, v) =>
          s
            .str(`  node "${v.title}" {`)
            .forStr(v.components, (s, v) => s.str(`   component "${v.title}"`))
            .forStr(v.infs, (s, v) => s.str(`   interface "${v.title}"`))
            .str(' }'),
        nodes.length > 0 ? '\n' : '',
      )
      .forStr(
        clouds,
        (s, v) =>
          s
            .str(`  cloud "${v.title}" {`)
            .forStr(v.components, (s, v) => s.str(`    component "${v.title}"`))
            .forStr(v.infs, (s, v) => s.str(`    interface "${v.title}"`))
            .str('  }'),
        clouds.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        (s, v) =>
          s
            .str(`  database "${v.title}" {`)
            .forStr(v.components, (s, v) => s.str(`    component "${v.title}"`))
            .forStr(v.infs, (s, v) => s.str(`    interface "${v.title}"`))
            .str('  }'),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(components, (s, v) => s.str(`  component "${v.title}"`))
      .forStr(infs, (s, v) => s.str(`  interface "${v.title}"`))
      .str('@enduml')
      .toString('\n')
  }
}
