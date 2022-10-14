import * as sml from '../index'

describe('sml usecase test suites', () => {
  const title = 'hello usecase diagram'

  it('test only usecases', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.usecase('blog')
      ml.usecase('music')
      ml.usecase('play')
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [],
        "components": [
          {
            "id": "a_126ac9f6",
            "label": "blog",
            "stereotypes": "",
            "type": "usecase",
          },
          {
            "id": "a_18d67699",
            "label": "music",
            "stereotypes": "",
            "type": "usecase",
          },
          {
            "id": "a_a3b34c08",
            "label": "play",
            "stereotypes": "",
            "type": "usecase",
          },
        ],
        "config": {
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [],
        "notes": [],
        "rels": [],
        "title": "hello usecase diagram",
        "vlinks": [],
        "zones": [],
      }
    `)
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_usecase_diagram
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello usecase diagram

      usecase \\"blog\\" as a_126ac9f6
      usecase \\"music\\" as a_18d67699
      usecase \\"play\\" as a_a3b34c08


      @enduml"
    `)
  })

  it('only actor', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      ml.actor('first actor')
      ml.actor('another actor')
      ml.actor('Last actor')
    })

    expect(ast.actors).toMatchInlineSnapshot('[]')
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_usecase_diagram
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello usecase diagram

      actor \\"first actor\\" as a_dd79c149
      actor \\"another actor\\" as a_fc3baf5b
      actor \\"Last actor\\" as a_8b705053


      @enduml"
    `)
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
          "actorStyle": "awesome",
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
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_usecase_diagram
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello usecase diagram

      actor \\"Food Critic\\" as a_8781da4a
      Rectangle Restaurant {
        usecase \\"Eat Food\\" as a_a6709cd3
        usecase \\"Pay for food\\" as a_f870119e
        usecase \\"Drink\\" as a_40491db1
      }

      a_8781da4a --> a_a6709cd3
      a_8781da4a --> a_f870119e
      a_8781da4a --> a_40491db1

      @enduml"
    `)
  })

  it('test packages', () => {
    const { ast, emitter } = sml.UsecaseDiagram(title, (ml) => {
      const g = ml.actor('guest')

      const z1 = ml.zone(`Restaurant`)
      const u1 = ml.usecase('Eat Food').belongTo(z1)
      const u2 = ml.usecase('Pay for food').belongTo(z1)

      const z2 = ml.zone('Professional')
      const a1 = ml.actor('Chef').belongTo(z2)

      g.link([u1, u2], (l) => l.noteOf('guest note'))
      a1.link(u1)
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [],
        "components": [
          {
            "id": "a_084e0343",
            "label": "guest",
            "stereotypes": "",
            "type": "actor",
          },
        ],
        "config": {
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [
          {
            "from": "a_084e0343",
            "note": {
              "label": "guest note",
              "position": "right",
            },
            "to": [
              "a_a6709cd3",
              "a_f870119e",
            ],
          },
          {
            "from": "a_8fd82b88",
            "to": [
              "a_a6709cd3",
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
            ],
            "id": "z_e197a9cc",
            "label": "Restaurant",
            "stereotypes": "",
            "type": "Rectangle",
          },
          {
            "components": [
              {
                "id": "a_8fd82b88",
                "label": "Chef",
                "stereotypes": "",
                "type": "actor",
              },
            ],
            "id": "z_9e8b1602",
            "label": "Professional",
            "stereotypes": "",
            "type": "Rectangle",
          },
        ],
      }
    `)
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_usecase_diagram
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello usecase diagram

      actor \\"guest\\" as a_084e0343
      Rectangle Restaurant {
        usecase \\"Eat Food\\" as a_a6709cd3
        usecase \\"Pay for food\\" as a_f870119e
      }
      Rectangle Professional {
        actor \\"Chef\\" as a_8fd82b88
      }

      note \\"guest note\\" as nvlink_a_084e0343_a_a6709cd3
      (a_084e0343) -- nvlink_a_084e0343_a_a6709cd3
      nvlink_a_084e0343_a_a6709cd3 --> (a_a6709cd3)
      note \\"guest note\\" as nvlink_a_084e0343_a_f870119e
      (a_084e0343) -- nvlink_a_084e0343_a_f870119e
      nvlink_a_084e0343_a_f870119e --> (a_f870119e)
      a_8fd82b88 --> a_a6709cd3

      @enduml"
    `)
  })

  it('test actor style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor style', (ml) => {
      ml.configuration.actorStyle('default')
      const u = ml.actor('user')
      const c = ml.usecase('Write Blog')
      u.link(c)
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_actor_style
      !theme sketchy-outline
      skinparam actorStyle default
      skinparam packageStyle Rectangle
      left to right direction

      title test actor style

      actor \\"user\\" as a_ee11cbb1
      usecase \\"Write Blog\\" as a_0cce1966

      a_ee11cbb1 --> a_0cce1966

      @enduml"
    `)
  })

  it('test actor awesome style', () => {
    const { emitter } = sml.UsecaseDiagram('test actor awesome style', (ml) => {
      ml.configuration.actorStyle('awesome')

      const a = ml.actor('User')
      const c = ml.usecase('Learn JavaScript')

      a.link(c)
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_actor_awesome_style
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title test actor awesome style

      actor \\"User\\" as a_8f9bfe9d
      usecase \\"Learn JavaScript\\" as a_5d686b2e

      a_8f9bfe9d --> a_5d686b2e

      @enduml"
    `)
  })

  it('test note on simple actor or usecase', () => {
    const { emitter } = sml.UsecaseDiagram('test simple note', (ml) => {
      ml.actor('User').noteOf('a student user')
      ml.usecase('Coding').noteOf('Coding Rust')
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_simple_note
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title test simple note

      actor \\"User\\" as a_8f9bfe9d
      usecase \\"Coding\\" as a_cddcade0

      note right of (a_8f9bfe9d)
        a student user
      end note
      note right of (a_cddcade0)
        Coding Rust
      end note

      @enduml"
    `)
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
          "actorStyle": "awesome",
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
            "components": [
              {
                "id": "a_8fd82b88",
                "label": "Chef",
                "stereotypes": "",
                "type": "actor",
              },
              {
                "id": "a_8781da4a",
                "label": "Food Critic",
                "stereotypes": "",
                "type": "actor",
              },
            ],
            "id": "z_9e8b1602",
            "label": "Professional",
            "stereotypes": "",
            "type": "Rectangle",
          },
          {
            "components": [
              {
                "id": "a_39ce479e",
                "label": "Eat food",
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
              {
                "id": "a_457dd551",
                "label": "Review",
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
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml use_case_diagram
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title use case diagram

      actor \\"Guest\\" as a_adb831a7
      Rectangle Professional {
        actor \\"Chef\\" as a_8fd82b88
        actor \\"Food Critic\\" as a_8781da4a
      }
      Rectangle Restaurant {
        usecase \\"Eat food\\" as a_39ce479e
        usecase \\"Pay for food\\" as a_f870119e
        usecase \\"Drink\\" as a_40491db1
        usecase \\"Review\\" as a_457dd551
      }

      a_adb831a7 --> a_39ce479e
      a_adb831a7 --> a_f870119e
      a_adb831a7 --> a_40491db1
      a_adb831a7 --> a_457dd551
      a_8781da4a --> a_457dd551

      @enduml"
    `)
  })

  it('test stereotypes', () => {
    const { ast, emitter } = sml.UsecaseDiagram('test stereotypes', (ml) => {
      const a1 = ml.actor('User').stereotypes('human')
      const a2 = ml.actor('Main DataBase').stereotypes('Application')
      const u1 = ml.usecase('Use the application').stereotypes('Main')

      a1.link(u1, (l) => l.commentOf('invoke'))
      a2.link(u1, (l) => l.commentOf('invoke'))
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
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [
          {
            "comment": "invoke",
            "from": "a_8f9bfe9d",
            "to": [
              "a_a6f3cf91",
            ],
          },
          {
            "comment": "invoke",
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
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_stereotypes
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title test stereotypes

      actor \\"User\\" as a_8f9bfe9d <<human>>
      actor \\"Main DataBase\\" as a_a811389a <<Application>>
      usecase \\"Use the application\\" as a_a6f3cf91 <<Main>>

      a_8f9bfe9d --> a_a6f3cf91 : invoke
      a_a811389a --> a_a6f3cf91 : invoke

      @enduml"
    `)
    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## test stereotypes

      \`\`\`plantuml

      @startuml test_stereotypes
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title test stereotypes

      actor \\"User\\" as a_8f9bfe9d <<human>>
      actor \\"Main DataBase\\" as a_a811389a <<Application>>
      usecase \\"Use the application\\" as a_a6f3cf91 <<Main>>

      a_8f9bfe9d --> a_a6f3cf91 : invoke
      a_a811389a --> a_a6f3cf91 : invoke

      @enduml

      \`\`\`
      "
    `)
  })

  it('test relation with direction', () => {
    const { ast, emitter } = sml.UsecaseDiagram(
      'relation with direction',
      (ml) => {
        const u = ml.actor('user')
        const usLeft = ml.usecase('left')
        const usRight = ml.usecase('right')
        const usUp = ml.usecase('up')
        const usDown = ml.usecase('down')

        u.link(usLeft, (l) => l.directionOf('left'))
        u.link(usUp, (l) => l.directionOf('up'))
        u.vlink(usRight, (l) => l.directionOf('right'))
        u.rel(usDown, (l) => l.directionOf('left'))
      },
    )
    expect(ast).toMatchInlineSnapshot(`
      {
        "actors": [],
        "components": [
          {
            "id": "a_ee11cbb1",
            "label": "user",
            "stereotypes": "",
            "type": "actor",
          },
          {
            "id": "a_811882fe",
            "label": "left",
            "stereotypes": "",
            "type": "usecase",
          },
          {
            "id": "a_7c4f2940",
            "label": "right",
            "stereotypes": "",
            "type": "usecase",
          },
          {
            "id": "a_46c48bec",
            "label": "up",
            "stereotypes": "",
            "type": "usecase",
          },
          {
            "id": "a_74e8333a",
            "label": "down",
            "stereotypes": "",
            "type": "usecase",
          },
        ],
        "config": {
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [
          {
            "direction": "left",
            "from": "a_ee11cbb1",
            "to": [
              "a_811882fe",
            ],
          },
          {
            "direction": "up",
            "from": "a_ee11cbb1",
            "to": [
              "a_46c48bec",
            ],
          },
        ],
        "notes": [],
        "rels": [
          {
            "direction": "left",
            "from": "a_ee11cbb1",
            "to": [
              "a_74e8333a",
            ],
          },
        ],
        "title": "relation with direction",
        "vlinks": [
          {
            "direction": "right",
            "from": "a_ee11cbb1",
            "to": [
              "a_7c4f2940",
            ],
          },
        ],
        "zones": [],
      }
    `)
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml relation_with_direction
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title relation with direction

      actor \\"user\\" as a_ee11cbb1
      usecase \\"left\\" as a_811882fe
      usecase \\"right\\" as a_7c4f2940
      usecase \\"up\\" as a_46c48bec
      usecase \\"down\\" as a_74e8333a

      a_ee11cbb1 -left-> a_811882fe
      a_ee11cbb1 -up-> a_46c48bec
      a_ee11cbb1 .right.> a_7c4f2940
      a_ee11cbb1 -left- a_74e8333a

      @enduml"
    `)
  })
})
