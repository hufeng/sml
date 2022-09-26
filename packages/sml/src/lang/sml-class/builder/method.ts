import { MethodAst } from '../../types'
import { VisibleType } from '../syntax'

export class MethodBuilder {
  constructor(private methodAst: MethodAst) {}

  visible(v: VisibleType) {
    this.methodAst.visible = v
  }

  abstract(b: boolean) {
    this.methodAst.abstract = b
  }

  arg(name: string, type: string) {
    this.methodAst.params.push({ name, type })
    return this
  }

  ret(type: string = 'void') {
    this.methodAst.ret = type
  }
}
