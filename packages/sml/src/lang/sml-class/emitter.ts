import { Emitter } from '../base'
import { ClassDiagramAst } from '../types'

export class PumlClassEmitter extends Emitter<ClassDiagramAst> {
  static visibleMap = {
    private: '-',
    protected: '#',
    package_private: '~',
    public: '+',
  } as const

  emitCode() {
    const { clazzes, structs, enums, interfaces, protocols } = this.meta
    this.emitStart()
      .emitInf(interfaces)
      .emitProtocol(protocols)
      .emitClazz(clazzes)
      .emitStruct(structs)
      .emitEnum(enums)
      .emitEnd()

    return this.s.toString('\n')
  }

  private emitStart() {
    this.s.$s('@startuml').$fn(this.buildConfig)
    return this
  }

  private emitEnd() {
    this.s.$s('@enduml')
    return this
  }

  /**
   *
   * @param s
   * @param clazzes
   */
  private emitClazz(clazzes: ClassDiagramAst['clazzes']) {
    this.s.$for(clazzes, (s, clazz) => {
      // extends and implements
      if (clazz.extends.length > 0 || clazz.implements.length > 0) {
        s.$s(
          `class ${clazz.name}${
            clazz.extends.length > 0
              ? ' extends ' + clazz.extends.join(', ')
              : ' '
          }${
            clazz.implements.length > 0
              ? ' implements ' + clazz.implements.join(', ')
              : ' '
          }`,
        )
      }

      // class start
      s.$s(`${clazz.abstract ? 'abstract' : ''} class ${clazz.name} {`)
      // fields
      s.$for(clazz.fields, (s, field) => {
        const visible = PumlClassEmitter.visibleMap[field.visible]
        s.$s(`  ${visible} ${field.name}: ${field.type};`)
      })
      // methods
      s.$for(clazz.methods, (s, method) => {
        const visible = PumlClassEmitter.visibleMap[method.visible]
        s.$s(
          `  ${visible} ${method.abstract ? 'abstract ' : ''}${
            method.name
          }(${method.params.map((p) => `${p.name}: ${p.type}`).join(',')}): ${
            method.ret
          }`,
        )
      })
      s.$s('}')
    })
    return this
  }

  /**
   * emit enums code
   * @param s
   * @param enums
   */
  private emitEnum(enums: ClassDiagramAst['enums']) {
    this.s.$for(enums, (s, e) => {
      s.$s(`enum ${e.name} {`)
        .$for(e.fields, (s, field) =>
          s.$s(
            `  ${field.name}${
              field.value !== 'undefined' ? ': ' + field.value : ''
            }`,
          ),
        )
        .$s('}')
    })

    return this
  }

  private emitInf(infs: ClassDiagramAst['interfaces']) {
    this.s.$for(infs, (s, i) => {
      // implements other interfaces
      if (i.implements.length > 0) {
        s.$s(`interface ${i.name} implements ${i.implements.join(', ')}`)
      }
      // start interface
      s.$s(`interface ${i.name} {`)
        .$for(i.methods, (s, method) => {
          const params = method.params
            .map((p) => `${p.name}: ${p.type}`)
            .join(',')
          s.$s(`  + ${method.name}(${params}): ${method.ret}`)
        })
        .$s('}')
    })
    return this
  }

  private emitProtocol(prots: ClassDiagramAst['protocols']) {
    this.s.$for(prots, (s, prot) => {
      // implements other interfaces
      if (prot.implements.length > 0) {
        s.$s(`interface ${prot.name} implements ${prot.implements.join(', ')}`)
      }
      s.$s(`protocol ${prot.name} {`)
        .$for(prot.methods, (s, method) => {
          const params = method.params
            .map((p) => `${p.name}: ${p.type}`)
            .join(',')
          s.$s(`   + ${method.name}(${params}): ${method.ret}`)
        })
        .$s('}')
    })
    return this
  }

  private emitStruct(structs: ClassDiagramAst['structs']) {
    this.s.$for(structs, (s, struct) => {
      // extends and implements
      if (struct.extends.length > 0 || struct.implements.length > 0) {
        s.$s(
          `class ${struct.name}${
            struct.extends.length > 0
              ? ' extends ' + struct.extends.join(', ')
              : ' '
          }${
            struct.implements.length > 0
              ? ' implements ' + struct.implements.join(', ')
              : ' '
          }`,
        )
      }
      // struct start
      s.$s(`struct ${struct.name} {`)
      // fields
      s.$for(struct.fields, (s, field) => {
        const visible = PumlClassEmitter.visibleMap[field.visible]
        s.$s(`  ${visible} ${field.name}: ${field.type};`)
      })
      // methods
      s.$for(struct.methods, (s, method) => {
        const visible = PumlClassEmitter.visibleMap[method.visible]
        s.$s(
          `  ${visible} ${method.abstract ? 'abstract ' : ''}${
            method.name
          }(${method.params.map((p) => `${p.name}: ${p.type}`).join(',')}): ${
            method.ret
          }`,
        )
      })
      s.$s('}')
    })

    return this
  }
}
