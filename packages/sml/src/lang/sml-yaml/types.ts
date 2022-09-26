import { BaseAst, JsonPath } from '../types'

export interface YamlDiagramAst extends BaseAst {
  title: string
  yaml: string
  highlights: Array<JsonPath>
}
