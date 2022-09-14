import * as sml from '../index'

describe('sml class diagram test suites', () => {
  const title = `suml test suite`

  it('test class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.clazz(`org.hf.sml.UseCase`)
        .field('id', 'number')
        .field('name', 'string')
        .method('setId', ml.args(ml.arg('id', 'number')), ml.ret(ml.t.void))
        .method('getFullInof', ml.args(), ml.ret('string'))
      ml.struct(`org.hf.sml.Customer`)
        .field('id', 'number')
        .field('name', 'string')
        .method('setId', ml.args(ml.arg('id', 'number')), ml.ret(ml.t.void))
        .method('getFullInof', ml.args(), ml.ret('string'))
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test abstract class', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.abstractClazz('or.hf.sml.AbstractUserCase')
        .field('id', 'number', 'private')
        .field('name', 'string')
        .method('setId', ml.args(ml.arg('id', 'number')), ml.ret(ml.t.void))
        .method('getFullInof', ml.args(), ml.ret('string'))
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test enum', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.enum('org.hufeng.enum.Color')
        .field('Red', 0)
        .field('Green', 1)
        .field('Blue', 2)
      ml.enum('org.hufeng.enum.FileType')
        .field('Pdf', 'PDF')
        .field('doc', 'WORD')
        .field('xls', 'Excel')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test inf', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface('org.hufeng.service.UserService')
        .method('sayYou', ml.args(ml.arg('name', 'string')))
        .method('sayMe', ml.args(ml.arg('you', 'string')))

      ml.protocol('org.hufeng.protocol.UserService')
        .method('sayYou', ml.args(ml.arg('name', 'string')))
        .method('sayMe', ml.args(ml.arg('you', 'string')))
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test extends and implements', () => {
    const { emitter } = sml.ClassDiagram(title, (ml) => {
      ml.interface(`List`)
      ml.abstractClazz('AbstractList')

      ml.clazz('org.hufeng.util.MyList')
        .extends('AbstractList')
        .implements('List')

      ml.interface('I1')
      ml.interface('I2')
      ml.interface('I3').implements('I1').implements('I2')
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
