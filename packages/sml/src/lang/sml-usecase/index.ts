import { PumlUseCaseEmitter } from './emitter'
import { SmlUseCaseLang } from './syntax'

//~~~~~~~~~~~~ factory ~~~~~~~~~~~~~~~
export function UsecaseDiagram(
  title: string,
  fn: (ml: SmlUseCaseLang) => void,
) {
  const ast = {
    title: title,
    actors: [],
    components: [],
    zones: [],
    links: [],
    vlinks: [],
    rels: [],
    notes: [],
  }

  fn(new SmlUseCaseLang(ast))

  return {
    ast,
    emitter: new PumlUseCaseEmitter(ast),
  }
}
