export default class Builder {
  private buff: Array<string | Builder>

  constructor() {
    this.buff = []
  }

  str(s: string) {
    this.buff.push(s)
    return this
  }

  thunk(fn: (s: Builder) => void) {
    fn(this)
    return this
  }

  ifStr(cond: boolean, str: string) {
    if (cond) {
      this.buff.push(str)
    }
    return this
  }

  forStr<T>(
    arr: Array<T>,
    fn: (s: Builder, v: T, i?: number) => void,
    end: string = '',
  ) {
    // append for
    arr.forEach((v, i) => {
      fn(this, v, i)
    })
    // get last element and append
    const len = this.buff.length
    this.buff[len - 1] += end

    return this
  }

  toString(delimiter = '') {
    return this.buff.join(delimiter)
  }
}
