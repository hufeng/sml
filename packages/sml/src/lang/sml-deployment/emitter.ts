import S from '../s'
import { Emitter } from '../base'
import { DeploymentLangAst, DeploymentBase, DeploymentContainer } from './types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitCode() {
    const { title, zones, components, links, vlinks, rels } = this.meta

    return this.s
      .reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$fn(this.buildConfig)
      .$s('')
      .$fors(components, this.build)
      .$for(zones, this.buildZones)
      .$for(links, this.buildLinks)
      .$for(vlinks, this.buildVLink)
      .$for(rels, this.buildRels)
      .$s('@enduml')
      .toString()
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
