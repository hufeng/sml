import Builder from '../../common/builder'
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
      .thunk(this.buildConfig)
      .str('')
      .forStr(
        packages,
        (s, v) =>
          s
            .str(`package "${v.label}" {`)
            .forStr(v.components, this.container('component'))
            .forStr(v.infs, this.container('interface'))
            .str('}'),
        packages.length > 0 ? '\n' : '',
      )
      .forStr(
        nodes,
        (s, v) =>
          s
            .str(`node "${v.label}" {`)
            .forStr(v.components, this.container('component'))
            .forStr(v.infs, this.container('interface'))
            .str('}'),
        nodes.length > 0 ? '\n' : '',
      )
      .forStr(
        clouds,
        (s, v) =>
          s
            .str(`cloud "${v.label}" {`)
            .forStr(v.components, this.container('component'))
            .forStr(v.infs, this.container('interface'))
            .str('}'),
        clouds.length > 0 ? '\n' : '',
      )
      .forStr(
        databases,
        (s, v) =>
          s
            .str(`database "${v.label}" {`)
            .forStr(v.components, this.container('component'))
            .forStr(v.infs, this.container('interface'))
            .str('}'),
        databases.length > 0 ? '\n' : '',
      )
      .forStr(components, this.container(`component`))
      .forStr(infs, this.container(`interface`), infs.length > 0 ? '\n' : '')
      .forStr(links, (s, v) => s.str(`${v.from} --> ${v.to}`))
      .forStr(vlinks, (s, v) => s.str(`${v.from} ..> ${v.to}`))
      .forStr(rels, (s, v) => s.str(`${v.from} - ${v.to}`))
      .str('@enduml')
      .toString('\n')
  }

  container(name: 'component' | 'interface') {
    return (s: Builder, v: { label: string; name?: string }) =>
      s.str(`  ${name} "${v.label}"${v.name ? '  as ' + v.name : ''}`)
  }
}
