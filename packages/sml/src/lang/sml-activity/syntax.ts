import { Lang } from '../base'
import { ComponentBuilder } from './builder/component'
import { SmlActivityLangMeta } from './types'

export class SmlActivityLang extends Lang<SmlActivityLangMeta> {
  constructor(meta: SmlActivityLangMeta) {
    super(meta)
  }

  participant(label: string) {
    return new ComponentBuilder(this.meta, label, 'participant')
  }

  actor(label: string) {
    return new ComponentBuilder(this.meta, label, 'actor')
  }

  boundary(label: string) {
    return new ComponentBuilder(this.meta, label, 'boundary')
  }

  control(label: string) {
    return new ComponentBuilder(this.meta, label, 'control')
  }

  entity(label: string) {
    return new ComponentBuilder(this.meta, label, 'entity')
  }

  database(label: string) {
    return new ComponentBuilder(this.meta, label, 'database')
  }

  collections(label: string) {
    return new ComponentBuilder(this.meta, label, 'collections')
  }

  queue(label: string) {
    return new ComponentBuilder(this.meta, label, 'queue')
  }
}
