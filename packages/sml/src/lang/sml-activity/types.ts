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

export type LinkContainer = Omit<Required<LinkContainer>, 'rels'>

export interface SmlActivityLangMeta extends BaseAst, LinkContainer {
  components: Array<Component>
}

export type ComponentBuilderMeta = SmlActivityLangMeta
