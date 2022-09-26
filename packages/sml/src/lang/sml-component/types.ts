import { BaseAst, LinkContaniner } from '../types'
export type ComponentZoneStyle = 'package' | 'node' | 'cloud' | 'database'

export interface ComponentContainer {
  label: string
  name: string
  type: ComponentZoneStyle
  components: Array<{ label: string; id: string }>
  infs: Array<{ label: string; id: string }>
}

export interface SmlComponentAst extends BaseAst, Required<LinkContaniner> {
  zones: Array<ComponentContainer>
  components: Array<{ label: string; id: string }>
  infs: Array<{ label: string; id: string }>
}

export type ComponentBuilderMeta = Pick<
  SmlComponentAst,
  'components' | 'notes' | 'links' | 'vlinks' | 'rels' | 'zones'
>

export type InterfaceBuilderMeta = Pick<
  SmlComponentAst,
  'infs' | 'rels' | 'notes' | 'zones'
>

export type ZoneBuilderMeta = Pick<
  SmlComponentAst,
  'zones' | 'components' | 'infs'
>
