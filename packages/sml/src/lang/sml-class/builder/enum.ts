import { EnumType } from '../../types'

export class EnumBuilder {
  constructor(private e: EnumType) {}

  field(name: string, value?: string | number) {
    this.e.fields.push({ name, value })
    return this
  }
}
