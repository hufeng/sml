import { Lang } from '../base'

//~~~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~
class ClazzBuilder {
  constructor(private clazz: sml.ClazzAst) {}

  field(
    name: string,
    type: sml.DataType,
    visible: sml.VisibleType = 'private',
  ) {
    this.clazz.fields.push({ name, type, visible })
    return this
  }

  method(
    name: string,
    params: sml.MethodOptional,
    ret: sml.MethodOptional,
    ...rest: Array<sml.VisibleOptional | sml.abstractOptional>
  ) {
    const method = {
      abstract: false,
      visible: 'public' as sml.VisibleType,
      name,
      params: [] as Array<sml.ParamType>,
      ret: '' as sml.DataType,
    }
    params(method)
    ret(method)
    rest.forEach((opt) => opt(method))
    this.clazz.methods.push(method)
    return this
  }

  extends(...names: Array<string>) {
    this.clazz.extends = [...this.clazz.extends, ...names]
    return this
  }

  implements(...names: Array<string>) {
    this.clazz.implements = [...this.clazz.implements, ...names]
    return this
  }
}

class InfBuilder {
  constructor(private interfaces: sml.InfAst) {}

  method(
    name: string,
    args: sml.MethodOptional = (m: sml.MethodAst) => (m.params = []),
    ret: sml.MethodOptional = (m: sml.MethodAst) => (m.ret = 'void'),
  ) {
    const method = {
      name,
      visible: 'public' as sml.VisibleType,
      abstract: false,
      params: [] as Array<sml.ParamType>,
      ret: '' as sml.DataType,
    }
    args(method)
    ret(method)
    this.interfaces.methods.push(method)
    return this
  }

  implements(...names: Array<string>) {
    this.interfaces.implements = [...this.interfaces.implements, ...names]
    return this
  }
}

class EnumBuilder {
  constructor(private e: sml.EnumType) {}

  field(name: string, value?: string | number) {
    this.e.fields.push({ name, value })
    return this
  }
}

// ~~~~~~~~~~~~~ define class lang modeing ~~~~~~~~~~~~~~~~~~~
enum T {
  void = 'void',
  string = `string`,
  boolean = `boolean`,
  number = `number`,

  go_int8 = `go_int8`,
  go_int16 = `go_int16`,
  go_int32 = `go_int32`,
  go_int = `go_int`,
  go_uint = `go_uint`,
  go_byte = 'go_byte',
  go_int64 = `go_int64`,
  go_uint8 = `go_uint8`,
  go_uint16 = `go_uint16`,
  go_uint32 = `go_uint32`,
  go_uint64 = `go_uint64`,
  go_float32 = `go_float32`,
  go_float64 = `go_float64`,

  py_int = 'py_int',
  py_bool = `py_bool`,
  py_float = `py_float`,

  java_byte = `java_byte`,
  java_short = `java_short`,
  java_int = `java_int`,
  java_long = `java_long`,
  java_float = `java_float`,
  java_double = `java_double`,
  java_boolean = `java_boolean`,
  java_char = `java_char`,
}
export class SmlClazzLang extends Lang<sml.ClassDiagramAst> {
  constructor(meta: sml.ClassDiagramAst) {
    super(meta)
  }

  /**
   * define abstract class
   * @param name abstract class name
   * @returns
   */
  abstractClazz(name: string) {
    const clazz = {
      name,

      abstract: true,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    }
    this.meta.clazzes.push(clazz)
    return new ClazzBuilder(clazz)
  }

  /**
   * define class
   * @param name class name
   * @returns
   */
  clazz(name: string) {
    const clazz = {
      name,
      abstract: false,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    }
    this.meta.clazzes.push(clazz)
    return new ClazzBuilder(clazz)
  }

  /**
   * define interface
   * @param name interface name
   * @returns
   */
  interface(name: string) {
    const inf = {
      name,
      implements: [],
      methods: [],
    } as sml.InfAst
    this.meta.interfaces.push(inf)
    return new InfBuilder(inf)
  }

  /**
   * define enum
   * @param name enum name
   * @returns
   */
  enum(name: string) {
    const e = {
      name,
      fields: [],
    }
    this.meta.enums.push(e)
    return new EnumBuilder(e)
  }

  /**
   * define struct
   * @param name struct name
   * @returns
   */
  struct(name: string) {
    const s = {
      name,
      abstract: false,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    }
    this.meta.structs.push(s)
    return new ClazzBuilder(s)
  }

  /**
   * define a protocol
   * @param name protocol name
   * @returns
   */
  protocol(name: string) {
    const prot = {
      name,
      implements: [],
      methods: [],
    } as sml.InfAst
    this.meta.protocols.push(prot)
    return new InfBuilder(prot)
  }

  /**
   * args optional
   * @param args
   * @returns
   */
  args(...args: Array<sml.ParamType>) {
    return (m: sml.MethodAst) => (m.params = [...m.params, ...args])
  }

  /**
   * arg optional
   */
  arg(name: string, type: string) {
    return { name, type } as sml.ParamType
  }

  /**
   * return value type
   * @param type
   * @returns
   */
  ret(type: string) {
    return (m: sml.MethodAst) => (m.ret = type)
  }

  /**
   * setting field or method visible
   * @param v
   * @returns
   */
  visible(v: sml.VisibleType) {
    return (val: { visible: sml.VisibleType }) => (val.visible = v)
  }

  /**
   * setting method whether is abstract
   * @param v
   * @returns
   */
  abstract(v: boolean) {
    return (val: { abstract: boolean }) => (val.abstract = v)
  }

  t = T
}
