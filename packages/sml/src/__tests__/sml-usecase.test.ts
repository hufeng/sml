import * as sml from '../index'

describe('sml usercase test suites', () => {
  const title = 'hello usercase diagram'

  it('test only usercases', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.usecase('blog', 'u1').usecase('music', 'u2').usecase('play', 'u3')
    })

    expect(ast.usecases).toEqual([
      {
        name: 'u1',
        label: 'blog',
      },
      { name: 'u2', label: 'music' },
      { name: 'u3', label: 'play' },
    ])

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('only actor', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('first actor', 'user1')
        .actor('another actor', 'user2')
        .actor('Last actor', 'user3')
    })
    expect(ast.actors).toEqual([
      {
        name: 'user1',
        label: 'first actor',
      },
      { name: 'user2', label: 'another actor' },
      { name: 'user3', label: 'Last actor' },
    ])
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test rect', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('Food Critic', 'fc')
      ml.package('Restaurant')
        .usecase('Eat Food', 'uc1')
        .usecase('Pay for food', 'uc2')
        .usecase('Drink', 'uc3')

      ml.linkMany('fc', ['uc1', 'uc2', 'uc3'])
    })
    expect(ast).toEqual({
      title,
      config: {
        actorStyle: 'default',
        packageStyle: 'Rectangle',
        direction: 'left->right',
        theme: 'sketchy-outline',
      },
      usecases: [],
      notes: [],
      actors: [{ name: 'fc', label: 'Food Critic' }],
      packages: [
        {
          label: 'Restaurant',
          type: 'Rectangle',
          actors: [],
          usecases: [
            { name: 'uc1', label: 'Eat Food' },
            { name: 'uc2', label: 'Pay for food' },
            { name: 'uc3', label: 'Drink' },
          ],
        },
      ],
      links: [{ from: 'fc', to: ['uc1', 'uc2', 'uc3'] }],
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test packages', () => {
    const { emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('guest', 'g')
      ml.package(`Restaurant`, 'Rectangle')
        .usecase('Eat Food', 'uc1')
        .usecase('Pay for food', 'uc2')
      ml.package('Professional').actor('Chef', 'a')
      ml.linkMany('g', ['uc1', 'uc2', 'uc3']).link('a', 'uc1')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test actor style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor style', (ml) => {
      ml.configuration.actorStyle('default')
      ml.actor('user', 'u1').usecase('Write Blog', 'c1').link('u1', 'c1')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test actor awesome style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor asesome style', (ml) => {
      ml.configuration.actorStyle('awesome')
      ml.actor('User', 'a1').usecase('Learn JavaScript', `u1`)
      ml.link('a1', 'u1')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test note on simple actor or usecase', () => {
    const { emitter } = sml.UsecaseDiagram('test simple note', (ml) => {
      ml.actor('User', 'a1', ml.noteOf('a student user'))
      ml.usecase('Coding', 'u1', ml.noteOf('Coding Rust'))
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
