import { Lang } from '../base'

// ~~~~~~~~~~~` define json lang modeling ~~~~~~~~~~~~~~`
export class SmlJsonLang extends Lang<Sml.JsonDiagramAst> {
  constructor(meta: Sml.JsonDiagramAst) {
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
  highlights(arr: Array<Sml.JsonPath>) {
    this.meta.highlights = arr
    return this
  }
}
