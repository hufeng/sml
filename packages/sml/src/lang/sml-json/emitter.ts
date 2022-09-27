import { Emitter } from '../base'
import { JsonDiagramAst } from './types'

export class PumlJsonEmitter extends Emitter<JsonDiagramAst> {
  emitCode() {
    const { title, highlights, json } = this.meta
    return this.s
      .reset()
      .$s(`@startjson ${title.replace(/ /g, '_')}`)
      .$fn(this.buildTheme)
      .$fors(highlights, (s, highlight) =>
        s.$s(
          `#highlight ${highlight
            .split('.')
            .map((str) => JSON.stringify(str))
            .join(' / ')}`,
        ),
      )
      .$s(JSON.stringify(json, null, 2))
      .$s('@endjson')
      .toString()
  }
}
