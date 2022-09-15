namespace Sml {
  // ~~~~~~~~~~basic type~~~~~~~~~~~~~

  /**
   * package style
   */
  export type PackageStyle =
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
  export type Postion = 'top' | 'right' | 'bottom' | 'left'
  export type DataType = string
  export type VisibleType =
    | 'private'
    | 'protected'
    | 'public'
    | 'package_private'
  export type ParamType = { name: string; type: DataType }
  export type MethodOptional = (m: MethodAst) => void
  export type VisibleOptional = (v: { visible: VisibleType }) => void
  export type abstractOptional = (a: { abstract: boolean }) => void

  // ~~~~~~ composite type ~~~~~~~~~~~~~~~

  export type GlobalConfigType = {
    actorStyle: ActorStyleType
    direction: DirectionType
    packageStyle: PackageStyle
  }

  // ~~~~~~~~ Diagram Ast ~~~~~~~~~~~~~~~~~~~

  export interface BaseAst {
    title: string
    config?: GlobalConfigType
  }
  export interface UseCaseDiagramAst extends BaseAst {
    actors: Array<Actor>
    usecases: Array<UseCase>
    packages: Array<PackageAst>
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
  }
  export type NoteAst = {
    label: string
    position: Postion
    on: ID | { from: ID; to: ID }
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
  export interface PackageAst {
    label: string
    type: PackageStyle
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
}
