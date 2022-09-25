import * as sml from '../index'

describe('sml usecase test suites', () => {
  const title = 'hello usecase diagram'

  it('test only usecases', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.usecase('blog')
      ml.usecase('music')
      ml.usecase('play')
    })

    expect(ast.usecases).toMatchInlineSnapshot(`
      [
        {
          "label": "blog",
          "name": "uc_126ac9f6",
        },
        {
          "label": "music",
          "name": "uc_18d67699",
        },
        {
          "label": "play",
          "name": "uc_a3b34c08",
        },
      ]
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('only actor', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('first actor')
      ml.actor('another actor')
      ml.actor('Last actor')
    })

    expect(ast.actors).toMatchInlineSnapshot(`
      [
        {
          "label": "first actor",
          "name": "a_dd79c149",
        },
        {
          "label": "another actor",
          "name": "a_fc3baf5b",
        },
        {
          "label": "Last actor",
          "name": "a_8b705053",
        },
      ]
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test rect', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      // actor
      const a = ml.actor('Food Critic')

      //zone and usecase
      const z = ml.zone('Restaurant')
      const u1 = ml.usecase('Eat Food')
      const u2 = ml.usecase('Pay for food')
      const u3 = ml.usecase('Drink')
      z.has(u1, u2, u3)

      // link
      a.link([u1, u2, u3])
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [
          {
            "label": "Food Critic",
            "name": "a_8781da4a",
          },
        ],
        "config": {
          "actorStyle": "default",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [
          {
            "from": "a_8781da4a",
            "to": [
              "uc_a6709cd3",
              "uc_f870119e",
              "uc_40491db1",
            ],
          },
        ],
        "notes": [],
        "title": "hello usecase diagram",
        "usecases": [],
        "zones": [
          {
            "actors": [],
            "label": "Restaurant",
            "type": "Rectangle",
            "usecases": [
              {
                "label": "Eat Food",
                "name": "uc_a6709cd3",
              },
              {
                "label": "Pay for food",
                "name": "uc_f870119e",
              },
              {
                "label": "Drink",
                "name": "uc_40491db1",
              },
            ],
          },
        ],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test packages', () => {
    const { emitter } = sml.UsecaseDiagram(title, (ml) => {
      const g = ml.actor('guest')

      const z1 = ml.zone(`Restaurant`)
      const u1 = ml.usecase('Eat Food')
      const u2 = ml.usecase('Pay for food')
      z1.has(u1, u2)

      const z2 = ml.zone('Professional')
      const a1 = ml.actor('Chef')
      z2.has(a1)

      g.link([u1, u2], (l) => l.noteOf('guest note'))
      a1.link(u1)
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test actor style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor style', (ml) => {
      ml.configuration.actorStyle('default')
      const u = ml.actor('user')
      const c = ml.usecase('Write Blog')
      u.link(c)
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test actor awesome style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor awesome style', (ml) => {
      ml.configuration.actorStyle('awesome')

      const a = ml.actor('User')
      const c = ml.usecase('Learn JavaScript')

      a.link(c)
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test note on simple actor or usecase', () => {
    const { emitter } = sml.UsecaseDiagram('test simple note', (ml) => {
      ml.actor('User').noteOf('a student user')
      ml.usecase('Coding').noteOf('Coding Rust')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
