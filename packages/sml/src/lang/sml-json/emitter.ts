import { Emitter } from '../base'
import { JsonDiagramAst } from '../types'

export class PumlJsonEmitter extends Emitter<JsonDiagramAst> {
  emitCode() {
    const { highlights, json } = this.meta
    return this.s
      .str(`@startjson`)
      .forStr(
        highlights,
        (s, highlight) =>
          s.str(
            `#highlight ${highlight
              .split('.')
              .map((str) => JSON.stringify(str))
              .join(' / ')}`,
          ),
        highlights.length > 0 ? '\n' : '',
      )
      .str(JSON.stringify(json, null, 2))
      .str('@endjson')
      .toString('\n')
  }
}
