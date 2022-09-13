import { Lang } from './sml'
import { globalCollections } from './sml-global'

// ~~~~~~~~~~~~~~ basic type ~~~~~~~~~~~~~~~~~
type DataType = string
export type VisibleType = 'private' | 'protected' | 'public' | 'package_private'
type ParamType = { name: string; type: DataType }
type MethodOptional = (m: MethodType) => void
type VisibleOptional = (v: { visible: VisibleType }) => void
type abstractOptional = (a: { abstract: boolean }) => void

// ~~~~~~~~~~~~~~ container type ~~~~~~~~~~~~
type FiledType = {
  name: string
  type: DataType
  visible: VisibleType
}
type MethodType = {
  abstract: boolean
  visible: VisibleType
  name: string
  params: Array<ParamType>
  ret: DataType
}
type ClazzType = {
  name: string
  abstract: boolean
  fields: Array<FiledType>
  methods: Array<MethodType>
  extends: Array<string>
  implements: Array<string>
}
type InterfaceType = {
  name: string
  implements: Array<string>
  methods: Array<MethodType>
}
type EnumFieldTyep = {
  name: string
  value?: number | string
}
type EnumType = {
  name: string
  fields: Array<EnumFieldTyep>
}
type StructType = ClazzType
type ProtocolType = InterfaceType
export interface SmlClazzMeta {
  clazzes: Array<ClazzType>
  interfaces: Array<InterfaceType>
  enums: Array<EnumType>
  structs: Array<StructType>
  protocols: Array<ProtocolType>
}

class ClazzBuilder {
  constructor(private clazz: ClazzType) {}

  field(name: string, type: DataType, visible: VisibleType = 'private') {
    this.clazz.fields.push({ name, type, visible })
    return this
  }

  method(
    name: string,
    params: MethodOptional,
    ret: MethodOptional,
    ...rest: Array<VisibleOptional | abstractOptional>
  ) {
    const method = {
      abstract: false,
      visible: 'public' as VisibleType,
      name,
      params: [] as Array<ParamType>,
      ret: '' as DataType,
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
  constructor(private interfaces: InterfaceType) {}

  method(
    name: string,
    args: MethodOptional = (m: MethodType) => (m.params = []),
    ret: MethodOptional = (m: MethodType) => (m.ret = 'void'),
  ) {
    const method = {
      name,
      visible: 'public' as VisibleType,
      abstract: false,
      params: [] as Array<ParamType>,
      ret: '' as DataType,
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
  constructor(private e: EnumType) {}

  field(name: string, value?: string | number) {
    this.e.fields.push({ name, value })
    return this
  }
}

export class SmlClazzLang extends Lang {
  private meta: SmlClazzMeta

  constructor(title: string) {
    super(title)
    this.meta = {
      clazzes: [],
      interfaces: [],
      enums: [],
      structs: [],
      protocols: [],
    }
  }

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

  interface(name: string) {
    const inf = {
      name,
      implements: [],
      methods: [],
    } as InterfaceType
    this.meta.interfaces.push(inf)
    return new InfBuilder(inf)
  }

  enum(name: string) {
    const e = {
      name,
      fields: [],
    }
    this.meta.enums.push(e)
    return new EnumBuilder(e)
  }

  struct(name: string) {
    const s = {
      name,
      abstract: false,
      fields: [],
      methods: [],
      extends: [],
      implements: [],
    } as ClazzType
    this.meta.structs.push(s)
    return new ClazzBuilder(s)
  }

  protocol(name: string) {
    const prot = {
      name,
      implements: [],
      methods: [],
    } as InterfaceType
    this.meta.protocols.push(prot)
    return new InfBuilder(prot)
  }

  args(...args: Array<ParamType>) {
    return (m: MethodType) => (m.params = [...m.params, ...args])
  }

  arg(name: string, type: string) {
    return { name, type } as ParamType
  }

  ret(type: string) {
    return (m: MethodType) => (m.ret = type)
  }

  visible(v: VisibleType) {
    return (val: { visible: VisibleType }) => (val.visible = v)
  }

  abstract(v: boolean) {
    return (val: { abstract: boolean }) => (val.abstract = v)
  }
}

export function Class(title: string, fn: (ml: SmlClazzLang) => void) {
  const lang = new SmlClazzLang(title)
  fn(lang)
  globalCollections.add(lang)
  return lang
}
