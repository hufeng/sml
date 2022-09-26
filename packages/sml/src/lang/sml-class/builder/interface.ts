import { VisibleType } from '../syntax'
import { MethodBuilder } from './method'
import { ParamType, DataType } from '../../types'
import { InfAst } from '../types'

export class InfBuilder {
  constructor(private interfaces: InfAst) {}

  method(name: string, fn: (m: MethodBuilder) => void) {
    const method = {
      name,
      visible: VisibleType.public,
      abstract: false,
      params: [] as Array<ParamType>,
      ret: 'void' as DataType,
    }

    fn(new MethodBuilder(method))
    this.interfaces.methods.push(method)

    return this
  }

  implements(...names: Array<string>) {
    this.interfaces.implements = [...this.interfaces.implements, ...names]
    return this
  }
}
