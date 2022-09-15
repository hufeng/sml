import { Emitter } from '../base'

export class PumlClassEmitter extends Emitter<Sml.ClassDiagramAst> {
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
    this.s.str('@startuml')
    return this
  }

  private emitEnd() {
    this.s.str('@enduml')
    return this
  }

  /**
   *
   * @param s
   * @param clazzes
   */
  private emitClazz(clazzes: Sml.ClassDiagramAst['clazzes']) {
    this.s.forStr(
      clazzes,
      (s, clazz) => {
        // extends and implements
        if (clazz.extends.length > 0 || clazz.implements.length > 0) {
          s.str(
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
        s.str(`${clazz.abstract ? 'abstract' : ''} class ${clazz.name} {`)
        // fields
        s.forStr(
          clazz.fields,
          (s, field) => {
            const visible = PumlClassEmitter.visibleMap[field.visible]
            s.str(`  ${visible} ${field.name}: ${field.type};`)
          },
          clazz.fields.length > 0 ? '\n' : '',
        )
        // methods
        s.forStr(clazz.methods, (s, method) => {
          const visible = PumlClassEmitter.visibleMap[method.visible]
          s.str(
            `  ${visible} ${method.abstract ? 'abstract ' : ''}${
              method.name
            }(${method.params.map((p) => `${p.name}: ${p.type}`).join(',')}): ${
              method.ret
            }`,
          )
        })
        s.str('}')
      },
      clazzes.length > 0 ? '\n' : '',
    )
    return this
  }

  /**
   * emit enums code
   * @param s
   * @param enums
   */
  private emitEnum(enums: Sml.ClassDiagramAst['enums']) {
    this.s.forStr(
      enums,
      (s, e) => {
        s.str(`enum ${e.name} {`)
          .forStr(e.fields, (s, field) =>
            s.str(
              `  ${field.name}${
                field.value !== 'undefined' ? ': ' + field.value : ''
              }`,
            ),
          )
          .str('}')
      },
      enums.length > 0 ? '\n' : '',
    )

    return this
  }

  private emitInf(infs: Sml.ClassDiagramAst['interfaces']) {
    this.s.forStr(
      infs,
      (s, i) => {
        // implements other interfaces
        if (i.implements.length > 0) {
          s.str(`interface ${i.name} implements ${i.implements.join(', ')}`)
        }
        // start interface
        s.str(`interface ${i.name} {`)
          .forStr(i.methods, (s, method) => {
            const params = method.params
              .map((p) => `${p.name}: ${p.type}`)
              .join(',')
            s.str(`  + ${method.name}(${params}): ${method.ret}`)
          })
          .str('}')
      },
      infs.length > 0 ? '\n' : '',
    )
    return this
  }

  private emitProtocol(prots: Sml.ClassDiagramAst['protocols']) {
    this.s.forStr(
      prots,
      (s, prot) => {
        // implements other interfaces
        if (prot.implements.length > 0) {
          s.str(
            `interface ${prot.name} implements ${prot.implements.join(', ')}`,
          )
        }
        s.str(`protocol ${prot.name} {`)
          .forStr(prot.methods, (s, method) => {
            const params = method.params
              .map((p) => `${p.name}: ${p.type}`)
              .join(',')
            s.str(`   + ${method.name}(${params}): ${method.ret}`)
          })
          .str('}')
      },
      prots.length > 0 ? '\n' : '',
    )
    return this
  }

  private emitStruct(structs: Sml.ClassDiagramAst['structs']) {
    this.s.forStr(
      structs,
      (s, struct) => {
        // extends and implements
        if (struct.extends.length > 0 || struct.implements.length > 0) {
          s.str(
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
        s.str(`struct ${struct.name} {`)
        // fields
        s.forStr(
          struct.fields,
          (s, field) => {
            const visible = PumlClassEmitter.visibleMap[field.visible]
            s.str(`  ${visible} ${field.name}: ${field.type};`)
          },
          struct.fields.length > 0 ? '\n' : '',
        )
        // methods
        s.forStr(struct.methods, (s, method) => {
          const visible = PumlClassEmitter.visibleMap[method.visible]
          s.str(
            `  ${visible} ${method.abstract ? 'abstract ' : ''}${
              method.name
            }(${method.params.map((p) => `${p.name}: ${p.type}`).join(',')}): ${
              method.ret
            }`,
          )
        })
        s.str('}')
      },
      structs.length > 0 ? '\n' : '',
    )
    return this
  }
}
