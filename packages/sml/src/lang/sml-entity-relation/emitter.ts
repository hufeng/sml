import { Emitter } from '../base'
import S from '../s'
import { Entity, EntityField, EntityRelationDiagramAst, Relation } from './type'

export class PumlEntityRelationEmitter extends Emitter<EntityRelationDiagramAst> {
  constructor(ast: EntityRelationDiagramAst) {
    super(ast)
  }

  emitPuml(): string {
    const { title, entities, relations } = this.meta
    return this.s
      .$reset()
      .$s(`@startuml ${title.replace(/ /g, '_')}`)
      .$s(this.buildTheme)
      .$s(this.buildTile)
      .$s(`hide circle`)
      .$s(`skinparam linetype ortho`)
      .$s('')
      .$for(entities, this.buildEntity)
      .$for(relations, this.buildRelation)
      .$s('@enduml')
      .toString()
  }

  private buildEntity(s: S, e: Entity) {
    return s
      .$s(`entity "${e.label}" as ${e.id} {`)
      .$for(e.ids, (s: S, f: EntityField) =>
        s.$s(`  *${f.name} : ${f.type}`, s.if$(f.stereotypes, ` <<${f.stereotypes}>>`)).$s(`--`),
      )
      .$for(e.fields, (s: S, f: EntityField) =>
        s.$s(`  ${f.name} : ${f.type}`, s.if$(f.stereotypes, ` <<${f.stereotypes}>>`)),
      )
      .$s('}')
  }

  private buildRelation(s: S, rel: Relation) {
    return s.$for(rel.to, (s: S, to) => s.$s(`${rel.from} ${rel.type} ${to}`))
  }
}
