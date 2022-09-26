import { Lang } from '../base'
import { JsonPath } from '../types'
import { JsonDiagramAst } from './types'

// ~~~~~~~~~~~` define json lang modeling ~~~~~~~~~~~~~~`
export class SmlJsonLang extends Lang<JsonDiagramAst> {
  constructor(meta: JsonDiagramAst) {
    super(meta)
  }

  /**
   * 设置json数据源头
   * @param json 数据源
   * @returns
   */
  json(json: any) {
    this.meta.json = json
    return this
  }

  /**
   * 添加json的高亮显示
   * @param arr 高亮json的路径
   * @returns
   */
  highlights(arr: Array<JsonPath>) {
    this.meta.highlights = arr
    return this
  }
}
