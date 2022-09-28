export default class S {
  #delimiter: string
  #buff: Array<string | S>

  constructor() {
    this.#buff = []
    this.#delimiter = '\n'
  }

  set $delimiter(s: string) {
    this.#delimiter = s
  }

  _if(cond: unknown, s1: string, s2: string = '') {
    return (s: S) => {
      s.$if(cond, s1, s2)
    }
  }

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

  $fn(fn: (s: S) => void) {
    fn(this)
    return this
  }

  $if(cond: unknown, s1: string, s2: string = '') {
    this.#buff.push(typeof cond === 'undefined' ? s2 : s1)
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

  $fors<T>(arr: Array<T> = [], fn: (s: S, v: T, i?: number) => void) {
    if (arr.length === 0) {
      return this
    }

    this.#buff.push('')
    // append for
    arr.forEach((v, i) => {
      fn(this, v, i)
    })
    this.#buff.push('')

    return this
  }

  $reset() {
    this.#buff = []
    return this
  }

  toString() {
    return this.#buff.join(this.#delimiter)
  }
}
