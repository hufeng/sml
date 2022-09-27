import { BaseAst, LinkContaniner } from '../types'

export interface Deployment {
  id: string
  head: string
  label: string
  type: string
}
export interface DeploymentContainer {
  id: string
  head: string
  label: string
  type: DeploymentZoneStyle
  components: Array<Deployment>
}

export type DeploymentZoneStyle =
  | 'artifact'
  | 'cloud'
  | 'component'
  | 'database'
  | 'node'

export interface DeploymentLangAst extends BaseAst, Required<LinkContaniner> {
  // container
  zones: Array<DeploymentContainer>
  // base
  components: Array<Deployment>
}
