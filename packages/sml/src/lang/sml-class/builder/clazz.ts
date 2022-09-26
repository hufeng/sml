import { VisibleType } from '../syntax'
import { MethodBuilder } from './method'
import { ClazzAst, DataType, ParamType, MethodAst } from '../../types'

export class ClazzBuilder {
  constructor(private clazz: ClazzAst) {}

  extends(...names: Array<string>) {
    this.clazz.extends = [...this.clazz.extends, ...names]
    return this
  }

  implements(...names: Array<string>) {
    this.clazz.implements = [...this.clazz.implements, ...names]
    return this
  }

  field(
    name: string,
    type: DataType,
    visible: VisibleType = VisibleType.private,
  ) {
    this.clazz.fields.push({ name, type, visible })
    return this
  }

  method(name: string, fn: (m: MethodBuilder) => void) {
    const method = {
      abstract: false,
      visible: VisibleType.public,
      name,
      params: [] as Array<ParamType>,
      ret: 'void' as DataType,
    } as MethodAst

    fn(new MethodBuilder(method))
    this.clazz.methods.push(method)

    return this
  }
}
