import crypto from 'node:crypto'

export class Builder {
  protected id(s: string) {
    const md5 = crypto.createHash('md5')
    return md5.update(s).digest('hex').substring(0, 8)
  }
}
