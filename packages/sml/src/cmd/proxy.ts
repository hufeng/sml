import * as lang from '../index'
import { Emitter } from '../lang/base'

declare global {
  var __emitters__: Array<{ emitter: Emitter<Sml.BaseAst>; ast: Sml.BaseAst }>
}

// hook sml api
globalThis.__emitters__ = []
globalThis.sml = new Proxy(lang, {
  get(target, prop: keyof typeof lang) {
    return (...args: Array<any>) => {
      // get raw method
      const method = target[prop]
      //@ts-ignore
      __emitters__.push(method(...args))
    }
  },
})
