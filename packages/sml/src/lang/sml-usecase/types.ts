import { BaseAst, LinkContaniner, NoteAst, ZoneStyle } from '../types'

export type Actor = { label: string; name: string }
export type UseCase = { label: string; name: string }

export interface UseCaseDiagramAst extends BaseAst, LinkContaniner {
  actors: Array<Actor>
  usecases: Array<UseCase>
  zones: Array<Zone>
}

export interface Zone {
  label: string
  name: string
  type: ZoneStyle
  actors: Array<Actor>
  usecases: Array<UseCase>
}

export interface ActorBuilderMeta extends LinkContaniner {
  actors: Array<Actor>
  zones: Array<Zone>
}

export type UsecaseMeta = {
  usecases: Array<UseCase>
  notes: Array<NoteAst>
  zones: Array<Zone>
}

export type ZoneMeta = {
  actors: Array<Actor>
  usecases: Array<UseCase>
  zones: Array<Zone>
}
