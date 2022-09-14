import { PumlJsonEmitter } from './emitter'
import { SmlJsonLang } from './syntax'

/**
 * sml json diagram syntax
 * @param title 当前视图的标题
 * @param fn
 * @returns
 */
export function JsonDiagram(title: string, fn: (ml: SmlJsonLang) => void) {
  const ast = {
    title,
    json: {},
    highlights: [],
  }
  fn(new SmlJsonLang(ast))
  return {
    ast,
    emitter: new PumlJsonEmitter(ast),
  }
}
