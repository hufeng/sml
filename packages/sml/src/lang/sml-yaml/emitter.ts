import { Emitter } from '../base'
import { YamlDiagramAst } from './types'

export default class PumlYamlEmitter extends Emitter<YamlDiagramAst> {
  emitPuml() {
    const { title, highlights, yaml } = this.meta

    return this.s
      .$reset()
      .$s(`@startyaml ${title.replace(/ /g, '_')}`)
      .$s(this.buildTheme)
      .$s(this.buildTile)
      .$for(highlights, (s, highlight) =>
        s.$s(
          `#highlight ${highlight
            .split('.')
            .map((str) => JSON.stringify(str))
            .join(' / ')}`,
        ),
      )
      .$s('')
      .$s(yaml)
      .$s('@endyaml')
      .toString()
  }
}
