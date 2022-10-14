import { Emitter } from '../base'
import S from '../s'
import { ExtProp, MapNode, ObjectDiagramAst, ObjectNode } from './types'

export class SmlObjectEmitter extends Emitter<ObjectDiagramAst> {
  emitPuml() {
    const { title, obj, map, links, vlinks, rels, exts, compose, aggrate } = this.meta
    return this.s
      .$reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$s(this.buildDirection)
      .$s(this.buildTheme)
      .$s('')
      .$for(obj, this.buildObj)
      .$for(map, this.buildMap)
      .$s('')
      .$for(exts, (s: S, p: ExtProp) => s.$s(`${p.to} <|-- ${p.from}`))
      .$for(compose, (s: S, p: ExtProp) => s.$s(`${p.to} *-- ${p.from}`))
      .$for(aggrate, (s: S, p: ExtProp) => s.$s(`${p.to} o-- ${p.from}`))
      .$for(links, this.buildLinks())
      .$for(vlinks, this.buildLinks('..>'))
      .$for(rels, this.buildLinks('--'))
      .$s('@enduml')
      .toString()
  }

  emitMarkdown() {
    return ''
  }

  private buildObj(s: S, o: ObjectNode) {
    s.$s(`object "${o.label}" as ${o.id} {`)
      .$for(o.fields, (s, f) => s.$s(`  ${f.name} : ${f.val}`))
      .$s('}')
  }

  private buildMap(s: S, m: MapNode) {
    s.$s(`map "${m.label}" as ${m.id} {`)
      .$for(m.fields, (s, f) => s.$s(`  ${f.key} ${f.arrow} ${f.val}`))
      .$s('}')
  }
}
