import { Builder } from '../../base'
import { Position } from '../../types'
import { UsecaseMeta, UseCase } from '../types'
import { ZoneBuilder, zoneWeakMap } from './zone'

export const usecaseWeakMap: WeakMap<UsecaseBuilder, string> = new WeakMap()

export class UsecaseBuilder extends Builder {
  #meta: UsecaseMeta
  #name: string
  #usecase: UseCase

  constructor(meta: UsecaseMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = `uc_${this.id(label)}`
    usecaseWeakMap.set(this, this.#name)

    this.#usecase = {
      name: this.#name,
      label,
    }
    this.#meta.usecases.push(this.#usecase)
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

  belongTo(z: ZoneBuilder) {
    const name = zoneWeakMap.get(z)!
    const zone = this.#meta.zones.find((zone) => zone.name === name)
    zone?.usecases.push(this.#usecase)

    // remove from usecase
    const index = this.#meta.usecases.findIndex((uc) => uc.name === this.#name)
    this.#meta.usecases.splice(index, 1)

    return this
  }
}
