import { BaseAst, LinkContainer } from '../types'

export type ComponentType =
  | 'participant'
  | 'actor'
  | 'boundary'
  | 'control'
  | 'entity'
  | 'database'
  | 'collections'
  | 'queue'

export interface Component {
  id: string
  label: string
  type: string
}

export interface SmlSequenceLangMeta extends BaseAst, Required<LinkContainer> {
  components: Array<Component>
}

export type ComponentBuilderMeta = Pick<
  SmlSequenceLangMeta,
  'components' | 'links' | 'notes' | 'vlinks'
>
