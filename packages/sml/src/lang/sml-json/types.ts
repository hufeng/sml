import { BaseAst, JsonPath } from '../types'

export interface JsonDiagramAst extends BaseAst {
  json: any
  highlights: Array<JsonPath>
}
