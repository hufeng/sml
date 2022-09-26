import { BaseAst, DataType, ParamType } from '../types'
import { VisibleType } from './syntax'

export interface ClassDiagramAst extends BaseAst {
  clazzes: Array<ClazzAst>
  interfaces: Array<InfAst>
  enums: Array<EnumType>
  structs: Array<StructAst>
  protocols: Array<ProtocolAst>
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

export type ClazzAst = {
  name: string
  abstract: boolean
  fields: Array<fieldAst>
  methods: Array<MethodAst>
  extends: Array<string>
  implements: Array<string>
}

export type fieldAst = {
  name: string
  type: DataType
  visible: VisibleType
}
