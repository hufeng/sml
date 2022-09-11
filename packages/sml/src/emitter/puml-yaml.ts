import { Emitter } from './emitter'
import { SmlYaml, SmlYamlMeta } from '../lang/sml-yaml'

export default class PmlYamlEmitter extends Emitter<SmlYaml> {
  emitCode() {
    const meta = (this.sml as any).meta as SmlYamlMeta
    return this.s
      .str(`@startyaml`)
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
      .str(meta.yaml)
      .str('@endyaml')
      .toString('\n')
  }
}
