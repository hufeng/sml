import { Lang } from './sml'
import { globalCollections } from './sml-global'
import { JsonPath } from './types'

// sml json meta interface
export interface SMLJsonMeta {
  title: string
  json: any
  highlights: Array<JsonPath>
}

// ~~~~~~~~~~~` define json lang modeling ~~~~~~~~~~~~~~`
export class SmlJsonLang extends Lang {
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

/**
 * sml json diagram syntax
 * @param title 当前视图的标题
 * @param fn
 * @returns
 */
export function JsonDiagram(title: string, fn: (ml: SmlJsonLang) => void) {
  const smlJson = new SmlJsonLang(title)
  fn(smlJson)
  globalCollections.add(smlJson)
  return smlJson
}
