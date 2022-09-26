import { Emitter } from '../base'
import { YamlDiagramAst } from './types'

export default class PumlYamlEmitter extends Emitter<YamlDiagramAst> {
  emitCode() {
    const { highlights, yaml } = this.meta

    return this.s
      .$s(`@startyaml`)
      .$fn(this.buildTheme)
      .$for(highlights, (s, highlight) =>
        s.$s(
          `#highlight ${highlight
            .split('.')
            .map((str) => JSON.stringify(str))
            .join(' / ')}`,
        ),
      )
      .$s(yaml)
      .$s('@endyaml')
      .toString('\n')
  }
}
