import * as lang from '../index'
import { Emitter } from '../lang/base'
import { BaseAst } from '../lang/types'

declare global {
  var __emitters__: Array<{ emitter: Emitter<BaseAst>; ast: BaseAst }>
}

// hook sml api
globalThis.sml = new Proxy(lang, {
  get(target, prop: keyof typeof lang) {
    return (...args: Array<any>) => {
      // get raw method
      const method = target[prop]
      //@ts-ignore
      const { ast, emitter } = method(...args)
      globalThis.__emitters__?.push({ ast, emitter })
    }
  },
})
