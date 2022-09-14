import { Lang } from '../base'

// ~~~~~~~~~~~~~ define sml yaml lang modeling ~~~~~~~~~~~
export class SmlYamlLang extends Lang<sml.YamlDiagramAst> {
  constructor(meta: sml.YamlDiagramAst) {
    super(meta)
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
  highlights(arr: Array<sml.JsonPath>) {
    this.meta.highlights = arr
    return this
  }
}
