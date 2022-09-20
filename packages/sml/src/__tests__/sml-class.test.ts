import * as sml from '../index'

describe('sml class diagram test suites', () => {
  const title = `suml test suite`

  it('test class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.clazz(`org.hf.sml.UseCase`, (c) =>
        c
          .field('id', 'number')
          .field('name', 'string')
          .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
          .method('getFullInof', (m) => m.ret('string')),
      )

      ml.struct(`org.hf.sml.Customer`, (s) =>
        s
          .field('id', 'number')
          .field('name', 'string')
          .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
          .method('getFullInof', (m) => m.ret('string')),
      )
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test abstract class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.abstractClazz('or.hf.sml.AbstractUserCase')
        .field('id', 'number', 'private')
        .field('name', 'string')
        .method('setId', (m) => m.arg('id', 'number').ret(ml.t.void))
        .method('getFullInof', (m) => m.ret('string'))
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test enum', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.enum('org.hufeng.enum.Color', (e) =>
        e.field('Red', 0).field('Green', 1).field('Blue', 2),
      )

      ml.enum('org.hufeng.enum.FileType', (e) =>
        e.field('Pdf', 'PDF').field('doc', 'WORD').field('xls', 'Excel'),
      )
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test inf', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface('org.hufeng.service.UserService', (i) =>
        i
          .method('sayYou', (m) => m.arg('name', 'string'))
          .method('sayMe', (m) => m.arg('you', 'string')),
      )

      ml.protocol('org.hufeng.protocol.UserService', (p) =>
        p
          .method('sayYou', (m) => m.arg('name', 'string'))
          .method('sayMe', (m) => m.arg('you', 'string')),
      )
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test extends and implements', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface(`List`)
      ml.abstractClazz('AbstractList')

      ml.clazz('org.hufeng.util.MyList', (c) =>
        c.extends('AbstractList').implements('List'),
      )

      ml.interface('I1')
      ml.interface('I2')
      ml.interface('I3', (i) => i.implements('I1', 'I2'))
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
