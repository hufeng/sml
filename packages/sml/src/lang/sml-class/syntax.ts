import { Lang } from '../base'

class MethodBuilder {
  constructor(private methodAst: Sml.MethodAst) {}

  visible(v: Sml.VisibleType) {
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

//~~~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~
class ClazzBuilder {
  constructor(private clazz: Sml.ClazzAst) {}

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
    type: Sml.DataType,
    visible: Sml.VisibleType = 'private',
  ) {
    this.clazz.fields.push({ name, type, visible })
    return this
  }

  method(name: string, fn: (m: MethodBuilder) => void) {
    const method = {
      abstract: false,
      visible: 'public' as Sml.VisibleType,
      name,
      params: [] as Array<Sml.ParamType>,
      ret: 'void' as Sml.DataType,
    } as Sml.MethodAst

    fn(new MethodBuilder(method))
    this.clazz.methods.push(method)

    return this
  }
}

class InfBuilder {
  constructor(private interfaces: Sml.InfAst) {}

  method(name: string, fn: (m: MethodBuilder) => void) {
    const method = {
      name,
      visible: 'public' as Sml.VisibleType,
      abstract: false,
      params: [] as Array<Sml.ParamType>,
      ret: 'void' as Sml.DataType,
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

class EnumBuilder {
  constructor(private e: Sml.EnumType) {}

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

export class SmlClazzLang extends Lang<Sml.ClassDiagramAst> {
  constructor(meta: Sml.ClassDiagramAst) {
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
  clazz(name: string, fn: (c: ClazzBuilder) => void = () => {}) {
    const clazz = {
      name,
      abstract: false,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    }
    this.meta.clazzes.push(clazz)
    return fn(new ClazzBuilder(clazz))
  }

  /**
   * define interface
   * @param name interface name
   * @returns
   */
  interface(name: string, fn: (i: InfBuilder) => void = () => {}) {
    const inf = {
      name,
      implements: [],
      methods: [],
    } as Sml.InfAst
    this.meta.interfaces.push(inf)
    return fn(new InfBuilder(inf))
  }

  /**
   * define enum
   * @param name enum name
   * @returns
   */
  enum(name: string, fn: (e: EnumBuilder) => void = () => {}) {
    const e = {
      name,
      fields: [],
    }
    this.meta.enums.push(e)
    return fn(new EnumBuilder(e))
  }

  /**
   * define struct
   * @param name struct name
   * @returns
   */
  struct(name: string, fn: (s: ClazzBuilder) => void = () => {}) {
    const s = {
      name,
      abstract: false,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    }
    this.meta.structs.push(s)
    return fn(new ClazzBuilder(s))
  }

  /**
   * define a protocol
   * @param name protocol name
   * @returns
   */
  protocol(name: string, fn: (p: InfBuilder) => void = () => {}) {
    const prot = {
      name,
      implements: [],
      methods: [],
    } as Sml.InfAst
    this.meta.protocols.push(prot)
    return fn(new InfBuilder(prot))
  }

  t = T
}