import { Builder, LinkBuilder } from '../../base'
import { ZoneBuilder, zoneWeakMap } from './zone'
import { UsecaseBuilder, usecaseWeakMap } from './usecase'
import { Actor, ActorBuilderMeta } from '../types'
import { Position } from '../../types'

export const actorWeakMap: WeakMap<ActorBuilder, string> = new WeakMap()

export class ActorBuilder extends Builder {
  #name: string
  #meta: ActorBuilderMeta
  #actor: Actor

  constructor(meta: ActorBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = `a_${this.id(label)}`
    actorWeakMap.set(this, this.#name)

    this.#actor = {
      name: this.#name,
      label,
    }
    this.#meta.actors.push(this.#actor)
  }

  /**
   * setting link of actor
   * @param usecases
   * @param fn
   * @returns
   */
  link(
    usecases: UsecaseBuilder | Array<UsecaseBuilder>,
    fn?: (l: LinkBuilder) => void,
  ) {
    const uc = usecases instanceof Array ? usecases : [usecases]
    const to = uc.map((u) => usecaseWeakMap.get(u)!)

    const link = {
      from: this.#name,
      to,
    }
    fn && fn(new LinkBuilder(link))
    this.#meta.links.push(link)

    return this
  }

  /**
   * setting note of actor
   * @param label
   * @param position
   * @returns
   */
  noteOf(label: string, position: Position = 'right') {
    this.#meta.notes.push({ label, position, on: this.#name })
    return this
  }

  /**
   * seting belongTo zone
   * @param z
   * @returns
   */
  belongTo(z: ZoneBuilder) {
    const name = zoneWeakMap.get(z)!
    const zone = this.#meta.zones.find((zone) => zone.name === name)
    zone?.actors.push(this.#actor)

    // remove from actors
    const index = this.#meta.actors.findIndex(
      (actor) => actor.name === this.#name,
    )
    this.#meta.actors.splice(index, 1)

    return this
  }
}
