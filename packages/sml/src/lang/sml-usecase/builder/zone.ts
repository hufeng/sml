import { ActorBuilder, actorWeakMap } from './actor'
import { UsecaseBuilder, usecaseWeakMap } from './usecase'
import { ComponentZoneStyle, Zone, ZoneMeta } from '../../types'
import { Builder } from '../../base'

export const zoneWeakMap: WeakMap<ZoneBuilder, string> = new WeakMap()

export class ZoneBuilder extends Builder {
  #meta: ZoneMeta
  #zone: Zone
  #name: string

  constructor(meta: ZoneMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = 'z_' + this.id(label)
    zoneWeakMap.set(this, this.#name)

    this.#zone = {
      label,
      name: this.#name,
      type: 'package',
      actors: [],
      usecases: [],
    }
    this.#meta.zones.push(this.#zone)
  }

  /**
   * setting zone style, include 'package' | 'node' | 'cloud' | 'database'
   * @param type
   */
  style(type: ComponentZoneStyle = 'package') {
    this.#zone.type = type
    return this
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
