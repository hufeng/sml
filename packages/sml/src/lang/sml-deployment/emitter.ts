import S from '../s'
import { Emitter } from '../base'
import { DeploymentLangAst, DeploymentBase, DeploymentContainer } from './types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitCode() {
    const { zones, components, links, vlinks, rels } = this.meta

    return this.s
      .$s('@startuml')
      .$fn(this.buildConfig)
      .$s('')
      .$fors(components, this.build)
      .$for(zones, this.buildZones)
      .$for(links, this.buildLink)
      .$for(vlinks, this.buildVLink)
      .$for(rels, (s, v) => s.$s(`${v.from} - ${v.to}`))
      .$s('@enduml')
      .toString('\n')
  }

  build(s: S, v: DeploymentBase) {
    s.$s(`${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>>`)
  }

  buildZones(s: S, v: DeploymentContainer) {
    s.$s(`${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>> {`)
      .$for(v.children, (s, v) =>
        s.$s(`  ${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>>`),
      )
      .$s('}')
  }
}
