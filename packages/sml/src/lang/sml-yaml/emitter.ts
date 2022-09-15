import { Emitter } from '../base'

export default class PumlYamlEmitter extends Emitter<Sml.YamlDiagramAst> {
  emitCode() {
    const { highlights, yaml } = this.meta

    return this.s
      .str(`@startyaml`)
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
