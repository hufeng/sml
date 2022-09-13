import { Lang } from './sml'
import { globalCollections } from './sml-global'
import { JsonPath } from './types'

export interface SmlYamlMeta {
  title: string
  yaml: string
  highlights: Array<JsonPath>
}

// ~~~~~~~~~~~~~ define sml yaml lang modeling ~~~~~~~~~~~
export class SmlYamlLang extends Lang {
  private meta: SmlYamlMeta

  constructor(title: string) {
    super(title)
    this.meta = {
      title: this.title,
      yaml: '',
      highlights: [],
    }
  }

  /**
   * 设置yaml数据源头
   * @param yaml 数据源
   * @returns
   */
  yaml(yaml: string) {
    this.meta.yaml = yaml.trim()
    return this
  }

  /**
   * 设置yaml高亮路径
   * @param arr 高亮yaml的路径
   * @returns
   */
  highlights(arr: Array<JsonPath>) {
    this.meta.highlights = arr
    return this
  }
}

/**
 * sml yaml diagram syntax
 * @param title 当前视图的标题
 * @param fn
 * @returns
 */
export function YamlDiagram(title: string, fn: (ml: SmlYamlLang) => void) {
  const smlYaml = new SmlYamlLang(title)
  fn(smlYaml)
  globalCollections.add(smlYaml)
  return smlYaml
}
