import S from '../s'
import { Emitter } from '../base'
import { DeploymentLangAst, Deployment, DeploymentContainer } from './types'

export class PumlDeploymentEmitter extends Emitter<DeploymentLangAst> {
  emitCode() {
    const { title, zones, components, links, vlinks, rels } = this.meta

    return this.s
      .$reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$fn(this.buildTheme)
      .$s('')
      .$fors(components, this.build)
      .$for(zones, this.buildZones)
      .$for(links, this.buildLinks())
      .$for(vlinks, this.buildVlink())
      .$for(rels, this.buildRels)
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
