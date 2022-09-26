import { Builder } from '../../base'
import { ComponentBuilder, componentWeakMap } from './component'
import { InterfaceBuilderMeta, Position } from '../../types'

export const interfaceWeakMap: WeakMap<InterfaceBuilder, string> = new WeakMap()

export class InterfaceBuilder extends Builder {
  #meta: InterfaceBuilderMeta
  #id: string

  constructor(meta: InterfaceBuilderMeta, label: string) {
    super()
    this.#meta = meta
    this.#id = `i_` + this.id(label)
    interfaceWeakMap.set(this, this.#id)

    const inf = {
      label,
      id: this.#id,
    }
    this.#meta.infs.push(inf)
  }

  /**
   *  setting relation
   * @param args
   */
  rel(...args: Array<ComponentBuilder | InterfaceBuilder>) {
    const to = args.map((builder) => {
      if (builder instanceof ComponentBuilder) {
        return componentWeakMap.get(builder)!
      } else if (builder instanceof InterfaceBuilder) {
        return interfaceWeakMap.get(builder)!
      } else {
        return ''
      }
    })

    this.#meta.rels.push({
      from: this.#id,
      to,
    })
  }

  /**
   * setting note of interface
   * @param label
   * @param position
   * @returns
   */
  note(label: string, position: Position = 'right') {
    this.#meta.notes.push({ label, position, on: this.#id })
    return this
  }
}
