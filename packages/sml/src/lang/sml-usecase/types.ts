import { BaseAst, LinkContainer, ZoneType } from '../types'

export type ComponentNode = {
  id: string
  label: string
  type: string
  stereotypes: string
}
export interface ZoneNode {
  id: string
  label: string
  type: ZoneType
  stereotypes: string
  components: Array<ComponentNode>
}

export type ComponentBuilderNode = Omit<UseCaseDiagramAst, 'title' | 'config'>
export type ZoneBuilderNode = Pick<UseCaseDiagramAst, 'zones' | 'components'>
export interface UseCaseDiagramAst extends BaseAst, Required<LinkContainer> {
  zones: Array<ZoneNode>
  components: Array<ComponentNode>
}
