// ~~~~~~~~~~basic type~~~~~~~~~~~~~
export type ID = string

/**
 * package style
 */
export type ZoneType =
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
export type DirectionType = 'left->right' | 'top->bottom'

export type Position = 'top' | 'right' | 'bottom' | 'left'
export type DataType = string

export type ParamType = { name: string; type: DataType }

export type Theme =
  | 'sketchy-outline'
  | 'cerulean-outline'
  | 'black-knight'
  | 'crt-green'
  | 'hacker'
  | 'sandstone'

// ~~~~~~ composite type ~~~~~~~~~~~~~~~

export type GlobalConfigType = {
  actorStyle: ActorStyleType
  direction: DirectionType
  packageStyle: ZoneType
  theme: Theme
}

// ~~~~~~~~ Diagram Ast ~~~~~~~~~~~~~~~~~~~

export interface BaseAst {
  title: string
  config?: GlobalConfigType
}

// ~~~~~~~~~~~ Field Ast ~~~~~~~~~~~~~~~~~~~~~~~~~~

export type LinkAst = {
  from: string
  to: Array<string>
  comment?: string
  direction?: 'left' | 'right' | 'up' | 'down' | ''
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

export interface LinkContainer {
  links: Array<{
    from: string
    to: string[]
    comment?: string
    note?: { label: string; position: Position }
  }>
  vlinks?: Array<{
    from: string
    to: string[]
    comment?: string
    note?: { label: string; position: Position }
  }>
  rels?: Array<LinkAst>
  notes: Array<NoteAst>
}
