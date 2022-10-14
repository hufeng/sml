export interface Props {
  delimiter?: string
}

export default class S {
  #delimiter: string
  #buff: Array<string | S>

  constructor(prop: Props = {}) {
    this.#buff = []
    this.#delimiter = prop.delimiter || '\n'
  }

  $reset() {
    this.#buff = []
    return this
  }

  // ~~~~~~~~~~~~~~~~~ column functional optional ~~~~~~~~~~~~~~~~~~~~~~
  if$(cond: unknown, s1: string, s2: string = '') {
    return (s: S) => {
      s.$if(cond, s1, s2)
    }
  }

  ifelse$(cond: unknown, s1: string, s2: string = '') {
    return (s: S) => {
      s.$ifelse(cond, s1, s2)
    }
  }

  for$<T>(arr: Array<T> = [], fn: (s: S, v: T, i?: number) => void) {
    return (s: S) => s.$for(arr, fn)
  }

  // ~~~~~~~~~~~~~~~~~ row ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  $s(...as: Array<string | ((s: S) => void)>) {
    const buff = []
    for (let s of as) {
      if (typeof s === 'string') {
        buff.push(s)
      } else {
        const ss = new S()
        s(ss)
        buff.push(ss.toString())
      }
    }
    this.#buff.push(buff.join(''))

    return this
  }

  $if(cond: unknown, s1: string, s2: string = '') {
    this.#buff.push(typeof cond === 'undefined' ? s2 : s1)
    return this
  }

  $ifelse(cond: unknown, s1: string, s2: string = '') {
    this.#buff.push(cond ? s1 : s2)
    return this
  }

  $for<T>(arr: Array<T> = [], fn: (s: S, v: T, i?: number) => void) {
    if (arr.length === 0) {
      return this
    }

    arr.forEach((v, i) => {
      fn(this, v, i)
    })

    return this
  }

  toString() {
    return this.#buff.join(this.#delimiter)
  }
}
