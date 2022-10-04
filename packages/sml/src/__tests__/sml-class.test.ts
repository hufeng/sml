import * as sml from '../index'

describe('sml class diagram test suites', () => {
  const title = `suml test suite`

  it('test class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.clazz(`org.hf.sml.UseCase`)
        .field('id', 'number')
        .field('name', 'string')
        .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
        .method('getFullInof', (m) => m.ret('string'))

      ml.struct(`org.hf.sml.Customer`)
        .field('id', 'number')
        .field('name', 'string')
        .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
        .method('getFullInof', (m) => m.ret('string'))
    })

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

       class org.hf.sml.UseCase {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      struct org.hf.sml.Customer {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## suml test suite

      \`\`\`plantuml

      @startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

       class org.hf.sml.UseCase {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      struct org.hf.sml.Customer {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      @enduml

      \`\`\`
      "
    `)
  })

  it('test abstract class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.abstractClazz('or.hf.sml.AbstractUserCase')
        .field('id', 'number', ml.private)
        .field('name', 'string')
        .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
        .method('getFullInof', (m) => m.ret('string'))
    })

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      abstract class or.hf.sml.AbstractUserCase {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## suml test suite

      \`\`\`plantuml

      @startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      abstract class or.hf.sml.AbstractUserCase {
        - id: number;
        - name: string;
        + setId(id: number): void
        + getFullInof(): string
      }
      @enduml

      \`\`\`
      "
    `)
  })

  it('test enum', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml
        .enum('org.hufeng.enum.Color')
        .field('Red', 0)
        .field('Green', 1)
        .field('Blue', 2),
        ml
          .enum('org.hufeng.enum.FileType')
          .field('Pdf', 'PDF')
          .field('doc', 'WORD')
          .field('xls', 'Excel')
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      enum org.hufeng.enum.Color {
        Red: 0
        Green: 1
        Blue: 2
      }
      enum org.hufeng.enum.FileType {
        Pdf: PDF
        doc: WORD
        xls: Excel
      }
      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## suml test suite

      \`\`\`plantuml

      @startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      enum org.hufeng.enum.Color {
        Red: 0
        Green: 1
        Blue: 2
      }
      enum org.hufeng.enum.FileType {
        Pdf: PDF
        doc: WORD
        xls: Excel
      }
      @enduml

      \`\`\`
      "
    `)
  })

  it('test inf', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface('org.hufeng.service.UserService')
        .method('sayYou', (m) => m.arg('name', 'string'))
        .method('sayMe', (m) => m.arg('you', 'string'))

      ml.protocol('org.hufeng.protocol.UserService')
        .method('sayYou', (m) => m.arg('name', 'string'))
        .method('sayMe', (m) => m.arg('you', 'string'))
    })

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      interface org.hufeng.service.UserService {
        + sayYou(name: string): void
        + sayMe(you: string): void
      }
      protocol org.hufeng.protocol.UserService {
         + sayYou(name: string): void
         + sayMe(you: string): void
      }
      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## suml test suite

      \`\`\`plantuml

      @startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      interface org.hufeng.service.UserService {
        + sayYou(name: string): void
        + sayMe(you: string): void
      }
      protocol org.hufeng.protocol.UserService {
         + sayYou(name: string): void
         + sayMe(you: string): void
      }
      @enduml

      \`\`\`
      "
    `)
  })

  it('test extends and implements', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface(`List`)
      ml.abstractClazz('AbstractList')

      ml
        .clazz('org.hufeng.util.MyList')
        .extends('AbstractList')
        .implements('List'),
        ml.interface('I1')
      ml.interface('I2')
      ml.interface('I3').implements('I1', 'I2')
    })

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      interface List {
      }
      interface I1 {
      }
      interface I2 {
      }
      interface I3 implements I1, I2
      interface I3 {
      }
      abstract class AbstractList {
      }
      class org.hufeng.util.MyList extends AbstractList implements List
       class org.hufeng.util.MyList {
      }
      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## suml test suite

      \`\`\`plantuml

      @startuml suml_test_suite
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title suml test suite

      interface List {
      }
      interface I1 {
      }
      interface I2 {
      }
      interface I3 implements I1, I2
      interface I3 {
      }
      abstract class AbstractList {
      }
      class org.hufeng.util.MyList extends AbstractList implements List
       class org.hufeng.util.MyList {
      }
      @enduml

      \`\`\`
      "
    `)
  })
})
