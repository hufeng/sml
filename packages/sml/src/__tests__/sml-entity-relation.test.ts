import * as sml from '../index'

describe('test e-r diagram test suite', () => {
  it('test full example', () => {
    const { ast, emitter } = sml.EntityRelationDiagram('test entity', (ml) => {
      const e1 = ml
        .entity(`EntityO1`)
        .field('e1_id', 'number', 'generated')
        .field('name', 'text')
        .field('description', 'text')

      const e2 = ml
        .entity(`Entity02`)
        .field('e2_id', 'number', 'generated')
        .field('e1_id', 'number', 'PK')
        .field('other_details', 'text')

      const e3 = ml
        .entity(`Entity03`)
        .field(`e3_id`, 'number', 'generated')
        .field('e1_id', 'number', 'FK')
        .field('e1_id', 'text')

      e1.rel(e2, ml.t.one2zeroMany)
      e1.rel(e3, ml.t.zeroOne2zeroMany)
    })
    expect(ast).toMatchInlineSnapshot(`
      {
        "config": {
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "entities": [
          {
            "fields": [
              {
                "name": "e1_id",
                "stereotypes": "generated",
                "type": "number",
              },
              {
                "name": "name",
                "stereotypes": "",
                "type": "text",
              },
              {
                "name": "description",
                "stereotypes": "",
                "type": "text",
              },
            ],
            "id": "e_7eda3cec",
            "ids": [],
            "label": "EntityO1",
          },
          {
            "fields": [
              {
                "name": "e2_id",
                "stereotypes": "generated",
                "type": "number",
              },
              {
                "name": "e1_id",
                "stereotypes": "PK",
                "type": "number",
              },
              {
                "name": "other_details",
                "stereotypes": "",
                "type": "text",
              },
            ],
            "id": "e_3b1c457f",
            "ids": [],
            "label": "Entity02",
          },
          {
            "fields": [
              {
                "name": "e3_id",
                "stereotypes": "generated",
                "type": "number",
              },
              {
                "name": "e1_id",
                "stereotypes": "FK",
                "type": "number",
              },
              {
                "name": "e1_id",
                "stereotypes": "",
                "type": "text",
              },
            ],
            "id": "e_2d3df50c",
            "ids": [],
            "label": "Entity03",
          },
        ],
        "relations": [
          {
            "comment": "",
            "from": "e_7eda3cec",
            "to": [
              "e_3b1c457f",
            ],
            "type": "||--o{",
          },
          {
            "comment": "",
            "from": "e_7eda3cec",
            "to": [
              "e_2d3df50c",
            ],
            "type": "|o--o{",
          },
        ],
        "title": "test entity",
      }
    `)
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_entity
      !theme sketchy-outline
      title test entity

      hide circle
      skinparam linetype ortho

      entity \\"EntityO1\\" as e_7eda3cec {
        e1_id : number <<generated>>
        name : text
        description : text
      }
      entity \\"Entity02\\" as e_3b1c457f {
        e2_id : number <<generated>>
        e1_id : number <<PK>>
        other_details : text
      }
      entity \\"Entity03\\" as e_2d3df50c {
        e3_id : number <<generated>>
        e1_id : number <<FK>>
        e1_id : text
      }
      e_7eda3cec ||--o{ e_3b1c457f
      e_7eda3cec |o--o{ e_2d3df50c
      @enduml"
    `)
  })
})
