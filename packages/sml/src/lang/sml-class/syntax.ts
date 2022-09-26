import { Lang } from '../base'
import { ClazzBuilder } from './builder/clazz'
import { EnumBuilder } from './builder/enum'
import { InfBuilder } from './builder/interface'
import { InfAst, ClassDiagramAst } from '../types'

export enum VisibleType {
  private = 'private',
  protected = 'protected',
  public = 'public',
  package_private = 'package_private',
}

// ~~~~~~~~~~~~~ define class lang modeing ~~~~~~~~~~~~~~~~~~~
enum T {
  void = 'void',
  string = `string`,
  boolean = `boolean`,
  number = `number`,

  int8 = `int8`,
  int16 = `int16`,
  int32 = `int32`,
  int = `int`,
  uint = `uint`,
  byte = 'byte',
  int64 = `int64`,
  uint8 = `uint8`,
  uint16 = `uint16`,
  uint32 = `uint32`,
  uint64 = `uint64`,
  float32 = `float32`,
  float64 = `float64`,

  short = `short`,
  long = `long`,
  float = `float`,
  double = `double`,
  char = `char`,
}

export class SmlClazzLang extends Lang<ClassDiagramAst> {
  constructor(meta: ClassDiagramAst) {
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
    } as InfAst
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
    } as InfAst
    this.meta.protocols.push(prot)
    return new InfBuilder(prot)
  }

  t = T

  get private() {
    return VisibleType.private
  }

  get protected() {
    return VisibleType.protected
  }

  get public() {
    return VisibleType.public
  }

  get package_private() {
    return VisibleType.package_private
  }
}
