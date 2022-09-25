import { ActorBuilder, actorWeakMap } from './actor'
import { UsecaseBuilder, usecaseWeakMap } from './usecase'
import { Zone, ZoneMeta, ZoneStyle } from '../../types'

export class ZoneBuilder {
  #meta: ZoneMeta
  #zone: Zone

  constructor(meta: ZoneMeta, label: string, type: ZoneStyle = 'Rectangle') {
    this.#meta = meta
    this.#zone = {
      label,
      type,
      actors: [],
      usecases: [],
    }
    this.#meta.zones.push(this.#zone)
  }

  /**
   * setting has actor or usecase
   * @param children
   */
  has(...children: Array<ActorBuilder | UsecaseBuilder>) {
    for (let child of children) {
      // update actor
      if (child instanceof ActorBuilder) {
        const name = actorWeakMap.get(child)!
        const index = this.#meta.actors.findIndex(
          (actor) => actor.name === name,
        )
        this.#zone.actors.push(this.#meta.actors[index]!)
        this.#meta.actors.splice(index, 1)
      }
      //update usecase
      else if (child instanceof UsecaseBuilder) {
        const name = usecaseWeakMap.get(child)
        const index = this.#meta.usecases.findIndex(
          (usecase) => usecase.name === name,
        )
        this.#zone.usecases.push(this.#meta.usecases[index]!)
        this.#meta.usecases.splice(index, 1)
      }
    }
  }
}
