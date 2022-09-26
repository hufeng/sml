import { Builder } from '../../base'
import { ComponentContainer } from '../../types'
import { ComponentBuilder, componentWeakMap } from './component'
import { InterfaceBuilder, interfaceWeakMap } from './interface'

export const zoneWeakMap: WeakMap<ZoneBuilder, string> = new WeakMap()

export class ZoneBuilder extends Builder {
  #meta: Array<ComponentContainer>
  #components: Array<{ label: string; id: string }>
  #infs: Array<{ label: string; id: string }>
  #zone: ComponentContainer

  constructor(
    meta: Array<ComponentContainer>,
    components: Array<{ label: string; id: string }>,
    infs: Array<{ label: string; id: string }>,
    label: string,
  ) {
    super()
    this.#meta = meta
    this.#components = components
    this.#infs = infs

    this.#zone = {
      label,
      components: [],
      infs: [],
    }
    this.#meta.push(this.#zone)
  }

  has(...arr: Array<ComponentBuilder | InterfaceBuilder>) {
    arr.forEach((builder) => {
      // update component
      if (builder instanceof ComponentBuilder) {
        const name = componentWeakMap.get(builder)!
        const index = this.#components.findIndex(
          (component) => component.id === name,
        )
        this.#zone.components.push(this.#components[index]!)
        this.#components.splice(index, 1)
      }

      // update interface
      else if (builder instanceof InterfaceBuilder) {
        const name = interfaceWeakMap.get(builder)!
        const index = this.#infs.findIndex((inf) => inf.id === name)
        this.#zone.infs.push(this.#infs[index]!)
        this.#infs.splice(index, 1)
      }
    })
  }
}
