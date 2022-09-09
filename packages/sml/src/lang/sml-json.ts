import { Lang } from './sml'
import { globalCollections } from './sml-global'
import { JsonPath } from './types'

// sml json meta interface
export interface SMLJsonMeta {
  title: string
  json: any
  highlights: Array<JsonPath>
}

export class SmlJson extends Lang {
  private meta: SMLJsonMeta

  constructor(title: string) {
    super(title)
    this.meta = {
      title,
      json: {},
      highlights: [],
    }
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

export function Json(title: string, fn: (ml: SmlJson) => void) {
  const smlJson = new SmlJson(title)
  fn(smlJson)
  globalCollections.add(smlJson)
  return smlJson
}
