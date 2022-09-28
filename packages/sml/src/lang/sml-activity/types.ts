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

export interface SmlActivityLangMeta extends BaseAst, Required<LinkContainer> {
  components: Array<Component>
}

export type ComponentBuilderMeta = Pick<
  SmlActivityLangMeta,
  'components' | 'links' | 'notes' | 'vlinks'
>
