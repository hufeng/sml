import { BaseAst, LinkContaniner } from '../types'
export type ComponentZoneStyle = 'package' | 'node' | 'cloud' | 'database'

export interface Component {
  id: string
  label: string
  type: 'interface' | 'component'
}

export interface ComponentContainer {
  label: string
  name: string
  type: ComponentZoneStyle
  components: Array<Component>
}

export interface SmlComponentAst extends BaseAst, Required<LinkContaniner> {
  zones: Array<ComponentContainer>
  components: Array<Component>
}

export type ComponentBuilderMeta = Pick<
  SmlComponentAst,
  'components' | 'notes' | 'links' | 'vlinks' | 'rels' | 'zones'
>

export type ZoneBuilderMeta = Pick<SmlComponentAst, 'zones' | 'components'>
