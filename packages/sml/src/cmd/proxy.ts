import * as lang from '../index'

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
