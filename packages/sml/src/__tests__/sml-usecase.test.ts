import * as sml from '../index'

describe('sml usecase test suites', () => {
  const title = 'hello usecase diagram'

  it('test only usecases', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.usecase('blog')
      ml.usecase('music')
      ml.usecase('play')
    })

    expect(ast.usecases).toMatchInlineSnapshot('undefined')
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('only actor', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('first actor')
      ml.actor('another actor')
      ml.actor('Last actor')
    })

    expect(ast.actors).toMatchInlineSnapshot('[]')
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
        "actors": [],
        "components": [
          {
            "id": "a_8781da4a",
            "label": "Food Critic",
            "stereotypes": "",
            "type": "actor",
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
              "a_a6709cd3",
              "a_f870119e",
              "a_40491db1",
            ],
          },
        ],
        "notes": [],
        "rels": [],
        "title": "hello usecase diagram",
        "vlinks": [],
        "zones": [
          {
            "components": [
              {
                "id": "a_a6709cd3",
                "label": "Eat Food",
                "stereotypes": "",
                "type": "usecase",
              },
              {
                "id": "a_f870119e",
                "label": "Pay for food",
                "stereotypes": "",
                "type": "usecase",
              },
              {
                "id": "a_40491db1",
                "label": "Drink",
                "stereotypes": "",
                "type": "usecase",
              },
            ],
            "id": "z_e197a9cc",
            "label": "Restaurant",
            "stereotypes": "",
            "type": "Rectangle",
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
      const u1 = ml.usecase('Eat Food').belongTo(z1)
      const u2 = ml.usecase('Pay for food').belongTo(z1)

      const z2 = ml.zone('Professional')
      const a1 = ml.actor('Chef').belongTo(z2)

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

  it('test demo', () => {
    const { ast, emitter } = sml.UsecaseDiagram('use case diagram', (ml) => {
      // ~~~~~~~~~~~~ actor domain ~~~~~~~~~~~~
      const a = ml.actor('Guest')

      const p = ml.zone('Professional')
      ml.actor('Chef').belongTo(p)
      const a1 = ml.actor('Food Critic').belongTo(p)

      // ~~~~~~~~~~~~ shopping domain ~~~~~~~~~~~~
      const shopping = ml.zone('Restaurant')
      const u1 = ml.usecase('Eat food').belongTo(shopping)
      const u2 = ml.usecase('Pay for food').belongTo(shopping)
      const u3 = ml.usecase('Drink').belongTo(shopping)
      const u4 = ml.usecase('Review').belongTo(shopping)

      // ~~~~~~~~~~~~ relation ~~~~~~~~~~~~
      a.link([u1, u2, u3, u4])
      a1.link(u4)
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [],
        "components": [
          {
            "id": "a_adb831a7",
            "label": "Guest",
            "stereotypes": "",
            "type": "actor",
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
            "from": "a_adb831a7",
            "to": [
              "a_39ce479e",
              "a_f870119e",
              "a_40491db1",
              "a_457dd551",
            ],
          },
          {
            "from": "a_8781da4a",
            "to": [
              "a_457dd551",
            ],
          },
        ],
        "notes": [],
        "rels": [],
        "title": "use case diagram",
        "vlinks": [],
        "zones": [
          {
            "components": [],
            "id": "z_9e8b1602",
            "label": "Professional",
            "stereotypes": "",
            "type": "Rectangle",
          },
          {
            "components": [],
            "id": "z_e197a9cc",
            "label": "Restaurant",
            "stereotypes": "",
            "type": "Rectangle",
          },
        ],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test stereotypes', () => {
    const { ast, emitter } = sml.UsecaseDiagram('test stereotypes', (ml) => {
      const a1 = ml.actor('User').stereotypes('human')
      const a2 = ml.actor('Main DataBase').stereotypes('Application')
      const u1 = ml.usecase('Use the application').stereotypes('Main')

      a1.link(u1)
      a2.link(u1)
    })
    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [],
        "components": [
          {
            "id": "a_8f9bfe9d",
            "label": "User",
            "stereotypes": "human",
            "type": "actor",
          },
          {
            "id": "a_a811389a",
            "label": "Main DataBase",
            "stereotypes": "Application",
            "type": "actor",
          },
          {
            "id": "a_a6f3cf91",
            "label": "Use the application",
            "stereotypes": "Main",
            "type": "usecase",
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
            "from": "a_8f9bfe9d",
            "to": [
              "a_a6f3cf91",
            ],
          },
          {
            "from": "a_a811389a",
            "to": [
              "a_a6f3cf91",
            ],
          },
        ],
        "notes": [],
        "rels": [],
        "title": "test stereotypes",
        "vlinks": [],
        "zones": [],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
