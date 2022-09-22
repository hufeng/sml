import { Emitter } from '../base'
import { YamlDiagramAst } from '../types'

export default class PumlYamlEmitter extends Emitter<YamlDiagramAst> {
  emitCode() {
    const { highlights, yaml } = this.meta

    return this.s
      .str(`@startyaml`)
      .thunk(this.buildTheme)
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
      .str(yaml)
      .str('@endyaml')
      .toString('\n')
  }
}
