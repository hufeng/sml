import type { VisibleType } from './sml-class/syntax'

// ~~~~~~~~~~basic type~~~~~~~~~~~~~

/**
 * package style
 */
export type ZoneStyle =
  | 'Node'
  | 'Rectangle'
  | 'Folder'
  | 'Frame'
  | 'Cloud'
  | 'DataBase'

/**
 * JsonPath 表达json的路径
 * 如：users.0.address.province
 */
export type JsonPath = string
export type ActorStyleType = 'default' | 'awesome' | 'Hollow'
export type DirectionType = 'left->right' | 'top->down'
export type ID = string
export type Actor = { label: string; name: string }
export type UseCase = { label: string; name: string }
export type Position = 'top' | 'right' | 'bottom' | 'left'
export type DataType = string

export type ParamType = { name: string; type: DataType }

// ~~~~~~ composite type ~~~~~~~~~~~~~~~

export type GlobalConfigType = {
  actorStyle: ActorStyleType
  direction: DirectionType
  packageStyle: ZoneStyle
  theme: 'sketchy-outline' | 'cerulean-outline' | 'black-knight'
}

// ~~~~~~~~ Diagram Ast ~~~~~~~~~~~~~~~~~~~

export interface BaseAst {
  title: string
  config?: GlobalConfigType
}

export type ActorBuilderMeta = {
  actors: Array<Actor>
  links: Array<LinkAst>
  notes: Array<NoteAst>
}
export type UsecaseMeta = {
  usecases: Array<UseCase>
  notes: Array<NoteAst>
}
export type ZoneMeta = {
  actors: Array<Actor>
  usecases: Array<UseCase>
  zones: Array<Zone>
}
export interface UseCaseDiagramAst extends BaseAst {
  actors: Array<Actor>
  usecases: Array<UseCase>
  zones: Array<Zone>

  links: Array<LinkAst>
  notes: Array<NoteAst>
}
export interface YamlDiagramAst extends BaseAst {
  title: string
  yaml: string
  highlights: Array<JsonPath>
}
export interface JsonDiagramAst extends BaseAst {
  json: any
  highlights: Array<JsonPath>
}
export interface ClassDiagramAst extends BaseAst {
  clazzes: Array<ClazzAst>
  interfaces: Array<InfAst>
  enums: Array<EnumType>
  structs: Array<StructAst>
  protocols: Array<ProtocolAst>
}

// ~~~~~~~~~~~ Field Ast ~~~~~~~~~~~~~~~~~~~~~~~~~~

export type LinkAst = {
  from: string
  to: Array<string>
  note?: {
    label: string
    position?: Position
  }
}
export type NoteAst = {
  label: string
  position: Position
  on: ID
}

export type FiledAst = {
  name: string
  type: DataType
  visible: VisibleType
}
export type MethodAst = {
  abstract: boolean
  visible: VisibleType
  name: string
  params: Array<ParamType>
  ret: DataType
}
export type InfAst = {
  name: string
  implements: Array<string>
  methods: Array<MethodAst>
}
export type EnumFieldAst = {
  name: string
  value?: number | string
}
export type EnumType = {
  name: string
  fields: Array<EnumFieldAst>
}
export type StructAst = ClazzAst
export type ProtocolAst = InfAst

export interface Zone {
  label: string
  type: ZoneStyle
  actors: Array<Actor>
  usecases: Array<UseCase>
}

export type ClazzAst = {
  name: string
  abstract: boolean
  fields: Array<FiledAst>
  methods: Array<MethodAst>
  extends: Array<string>
  implements: Array<string>
}

export interface DeploymentBase {
  title: string
  label: string
  id?: string
}

export interface DeploymentContainer extends DeploymentBase {
  id: string
  databases: Array<DeploymentBase>
  queues: Array<DeploymentBase>
  stacks: Array<DeploymentBase>
  boundary: Array<DeploymentBase>
  infs: Array<DeploymentBase>
  hexagons: Array<DeploymentBase>
  controls: Array<DeploymentBase>
  nodes: Array<DeploymentBase>
  collections: Array<DeploymentBase>
}

export interface DeploymentLangAst extends BaseAst {
  // container
  artifacts: Array<DeploymentContainer>
  clouds: Array<DeploymentContainer>
  components: Array<DeploymentContainer>
  databases: Array<DeploymentContainer>
  nodes: Array<DeploymentContainer>

  // base
  queues: Array<DeploymentBase>
  stacks: Array<DeploymentBase>
  actors: Array<DeploymentBase>
  boundary: Array<DeploymentBase>
  infs: Array<DeploymentBase>
  hexagons: Array<DeploymentBase>
  controls: Array<DeploymentBase>
  collections: Array<DeploymentBase>

  links: Array<{ from: string; to: string }>
  vlinks: Array<{ from: string; to: string }>
  rels: Array<{ from: string; to: string }>
}

export type ComponentBuilderMeta = Pick<
  SmlComponentAst,
  'components' | 'notes' | 'links' | 'vlinks' | 'rels'
>
export type InterfaceBuilderMeta = Pick<
  SmlComponentAst,
  'infs' | 'rels' | 'notes'
>
export interface ComponentContainer {
  label: string
  components: Array<{ label: string; id: string }>
  infs: Array<{ label: string; id: string }>
}

export interface SmlComponentAst extends BaseAst {
  links: Array<LinkAst>
  vlinks: Array<LinkAst>
  rels: Array<{ from: string; to: Array<string> }>
  notes: Array<{ label: string; position: Position; on: ID }>

  zones: Array<ComponentContainer>
  nodes: Array<ComponentContainer>
  databases: Array<ComponentContainer>
  clouds: Array<ComponentContainer>

  components: Array<{ label: string; id: string }>
  infs: Array<{ label: string; id: string }>
}
