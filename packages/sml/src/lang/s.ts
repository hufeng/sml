export default class S {
  private buff: Array<string | S>

  constructor() {
    this.buff = []
  }

  $s(s: string) {
    this.buff.push(s)
    return this
  }

  $fn(fn: (s: S) => void) {
    fn(this)
    return this
  }

  $if(cond: boolean, str: string) {
    if (cond) {
      this.buff.push(str)
    }
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

    this.buff.push('')
    // append for
    arr.forEach((v, i) => {
      fn(this, v, i)
    })
    this.buff.push('')

    return this
  }

  reset() {
    this.buff = []
    return this
  }

  toString(delimiter = '\n') {
    return this.buff.join(delimiter)
  }
}
