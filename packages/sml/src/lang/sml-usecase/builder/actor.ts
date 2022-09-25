import { LinkBuilder } from './link'
import { UsecaseBuilder, usecaseWeakMap } from './usecase'
import { ActorBuilderMeta, Position } from '../../types'
import { Builder } from './base'

export const actorWeakMap: WeakMap<ActorBuilder, string> = new WeakMap()

export class ActorBuilder extends Builder {
  #name: string
  #meta: ActorBuilderMeta

  constructor(meta: ActorBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#name = `a_${this.id(label)}`
    actorWeakMap.set(this, this.#name)

    const actor = {
      name: this.#name,
      label,
    }
    this.#meta.actors.push(actor)
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
}
