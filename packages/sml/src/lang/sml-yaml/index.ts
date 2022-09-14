import PumlYamlEmitter from './emitter'
import { SmlYamlLang } from './syntax'

/**
 * sml yaml diagram syntax
 * @param title 当前视图的标题
 * @param fn
 * @returns
 */
export function YamlDiagram(title: string, fn: (ml: SmlYamlLang) => void) {
  const ast = {
    title,
    yaml: '',
    highlights: [],
  }

  fn(new SmlYamlLang(ast))

  return {
    ast,
    emitter: new PumlYamlEmitter(ast),
  }
}
