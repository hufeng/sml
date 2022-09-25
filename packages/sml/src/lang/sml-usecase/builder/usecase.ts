import { Position, UsecaseMeta } from '../../types'
import { Builder } from './base'

export const usecaseWeakMap: WeakMap<UsecaseBuilder, string> = new WeakMap()

export class UsecaseBuilder extends Builder {
  #meta: UsecaseMeta
  #name: string

  constructor(meta: UsecaseMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = `uc_${this.id(label)}`
    usecaseWeakMap.set(this, this.#name)

    const usecase = {
      name: this.#name,
      label,
    }
    this.#meta.usecases.push(usecase)
  }

  /**
   * setting note of usecase
   * @param label
   * @param position
   */
  noteOf(label: string, position: Position = 'right') {
    this.#meta.notes.push({
      label,
      position,
      on: this.#name,
    })
  }
}
