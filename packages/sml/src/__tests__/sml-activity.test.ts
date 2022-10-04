import { SmlActivityDiagram } from '../lang/sml-activity'

describe('sml activity test suite', () => {
  it('test syntax', () => {
    const { ast, emitter } = SmlActivityDiagram('hello activities', (ml) => {
      const alice = ml.actor('Alice')
      const b = ml.boundary('Boundary')
      const c = ml.control('Control')
      const e = ml.entity('Entity')
      const db = ml.database('Database')
      const coll = ml.collections('Collections')
      const queue = ml.queue('Queue')

      alice.link(b, (l) => l.commentOf('To Boundary'))
      b.link(c)
      c.link(e)
      e.link(db)
      db.link(coll)
      coll.link(queue, (l) => l.commentOf('invoke'))
      queue.vlink(coll)
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "components": [
          {
            "id": "a64489c85",
            "label": "Alice",
            "type": "actor",
          },
          {
            "id": "be234de58",
            "label": "Boundary",
            "type": "boundary",
          },
          {
            "id": "ca1595abb",
            "label": "Control",
            "type": "control",
          },
          {
            "id": "e1a434bef",
            "label": "Entity",
            "type": "entity",
          },
          {
            "id": "de307db07",
            "label": "Database",
            "type": "database",
          },
          {
            "id": "ca9fc9193",
            "label": "Collections",
            "type": "collections",
          },
          {
            "id": "q722ad2d0",
            "label": "Queue",
            "type": "queue",
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
            "comment": "To Boundary",
            "from": "a64489c85",
            "to": [
              "be234de58",
            ],
          },
          {
            "from": "be234de58",
            "to": [
              "ca1595abb",
            ],
          },
          {
            "from": "ca1595abb",
            "to": [
              "e1a434bef",
            ],
          },
          {
            "from": "e1a434bef",
            "to": [
              "de307db07",
            ],
          },
          {
            "from": "de307db07",
            "to": [
              "ca9fc9193",
            ],
          },
          {
            "comment": "invoke",
            "from": "ca9fc9193",
            "to": [
              "q722ad2d0",
            ],
          },
        ],
        "notes": [],
        "rels": [],
        "title": "hello activities",
        "vlinks": [
          {
            "from": "q722ad2d0",
            "to": [
              "ca9fc9193",
            ],
          },
        ],
      }
    `)
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml
      !theme sketchy-outline

      actor \\"Alice\\" as a64489c85
      boundary \\"Boundary\\" as be234de58
      control \\"Control\\" as ca1595abb
      entity \\"Entity\\" as e1a434bef
      database \\"Database\\" as de307db07
      collections \\"Collections\\" as ca9fc9193
      queue \\"Queue\\" as q722ad2d0

      a64489c85 -> be234de58 : To Boundary
      be234de58 -> ca1595abb
      ca1595abb -> e1a434bef
      e1a434bef -> de307db07
      de307db07 -> ca9fc9193
      ca9fc9193 -> q722ad2d0 : invoke
      q722ad2d0 --> ca9fc9193

      @enduml"
    `)

    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## hello activities

      \`\`\`plantuml

      @startuml
      !theme sketchy-outline

      actor \\"Alice\\" as a64489c85
      boundary \\"Boundary\\" as be234de58
      control \\"Control\\" as ca1595abb
      entity \\"Entity\\" as e1a434bef
      database \\"Database\\" as de307db07
      collections \\"Collections\\" as ca9fc9193
      queue \\"Queue\\" as q722ad2d0

      a64489c85 -> be234de58 : To Boundary
      be234de58 -> ca1595abb
      ca1595abb -> e1a434bef
      e1a434bef -> de307db07
      de307db07 -> ca9fc9193
      ca9fc9193 -> q722ad2d0 : invoke
      q722ad2d0 --> ca9fc9193

      @enduml

      \`\`\`
      "
    `)
  })
})
