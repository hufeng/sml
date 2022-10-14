import S from '../s'
import { Emitter } from '../base'
import { DeploymentLangAst, Deployment, DeploymentContainer } from './types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitPuml() {
    const { title, zones, components, links, vlinks, rels } = this.meta

    return this.s
      .$reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$s(this.buildConfig)
      .$for(components, this.build)
      .$for(zones, this.buildZones)
      .$for(links, this.buildLinks())
      .$for(vlinks, this.buildLinks('..>'))
      .$for(rels, this.buildLinks('--'))
      .$s('')
      .$s('@enduml')
      .toString()
  }

  build(s: S, v: Deployment) {
    s.$s(`${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>>`)
  }

  buildZones(s: S, v: DeploymentContainer) {
    s.$s(`${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>> {`)
      .$for(v.components, (s, v) => s.$s(`  ${v.type} "${v.label}"${' as ' + v.id} <<${v.head}>>`))
      .$s('}')
  }
}
