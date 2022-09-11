import { Emitter } from './emitter'
import { SmlJson, SMLJsonMeta } from '../lang/sml-json'

export class PmlJsonEmitter extends Emitter<SmlJson> {
  emitCode() {
    const meta = (this.sml as any).meta as SMLJsonMeta
    return this.s
      .str(`@startjson`)
      .forStr(
        meta.highlights,
        (s, highlight) =>
          s.str(
            `#highlight ${highlight
              .split('.')
              .map((str) => JSON.stringify(str))
              .join(' / ')}`,
          ),
        meta.highlights.length > 0 ? '\n' : '',
      )
      .str(JSON.stringify(meta.json, null, 2))
      .str('@endjson')
      .toString('\n')
  }
}
