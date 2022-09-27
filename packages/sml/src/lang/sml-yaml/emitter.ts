import { Emitter } from '../base'
import { YamlDiagramAst } from './types'

export default class PumlYamlEmitter extends Emitter<YamlDiagramAst> {
  emitCode() {
    const { title, highlights, yaml } = this.meta

    return this.s
      .reset()
      .$s(`@startyaml ${title.replace(/ /g, '_')}`)
      .$fn(this.buildTheme)
      .$s('')
      .$fors(highlights, (s, highlight) =>
        s.$s(
          `#highlight ${highlight
            .split('.')
            .map((str) => JSON.stringify(str))
            .join(' / ')}`,
        ),
      )
      .$s(yaml)
      .$s('@endyaml')
      .toString()
  }
}
