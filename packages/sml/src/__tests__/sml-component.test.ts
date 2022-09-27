import { ComponentDiagram } from '../lang/sml-component'

describe('component diagram test suites', () => {
  it('test all components', () => {
    const { ast, emitter } = ComponentDiagram('component title', (ml) => {
      // elements
      const cloud = ml.zone('cloud').type('cloud')
      const c1 = ml.component('Nodejs').belongTo(cloud)
      const i1 = ml.interface('http').belongTo(cloud)

      const zone = ml.zone('bff')
      const c2 = ml.component('service-a').belongTo(zone)
      const c3 = ml.component('service-b').belongTo(zone)
      const i2 = ml.interface('rpc').belongTo(zone)

      const db = ml.zone('DataBase').type('database')
      const c4 = ml.component('mysql')
      const c5 = ml.component('redis')
      db.has(c4, c5)

      const node = ml.zone('Node').type('node')
      const c6 = ml.component('Go')
      node.has(c6)

      // links
      c1.link(c2, (l) => l.noteOf('connected'))
      c2.link(c3)
      c3.link(c4)
      c4.vlink(c5)
      c5.vlink(c6)

      i1.rel(c1)
      i2.rel(c3)
    })
    expect(ast).toMatchInlineSnapshot(`
      {
        "components": [],
        "config": {
          "actorStyle": "default",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "infs": [],
        "links": [
          {
            "from": "c_4b00bbf4",
            "note": {
              "label": "connected",
              "position": "right",
            },
            "to": [
              "c_7fdd65ec",
            ],
          },
          {
            "from": "c_7fdd65ec",
            "to": [
              "c_d77ba138",
            ],
          },
          {
            "from": "c_d77ba138",
            "to": [
              "c_81c3b080",
            ],
          },
        ],
        "notes": [],
        "rels": [
          {
            "from": "i_80791b3a",
            "to": [
              "c_4b00bbf4",
            ],
          },
          {
            "from": "i_da0fb2ac",
            "to": [
              "c_d77ba138",
            ],
          },
        ],
        "title": "component title",
        "vlinks": [
          {
            "from": "c_81c3b080",
            "to": [
              "c_86a1b907",
            ],
          },
          {
            "from": "c_86a1b907",
            "to": [
              "c_5f075ae3",
            ],
          },
        ],
        "zones": [
          {
            "components": [
              {
                "id": "c_4b00bbf4",
                "label": "Nodejs",
              },
            ],
            "infs": [
              {
                "id": "i_80791b3a",
                "label": "http",
              },
            ],
            "label": "cloud",
            "name": "z_a1234b31",
            "type": "cloud",
          },
          {
            "components": [
              {
                "id": "c_7fdd65ec",
                "label": "service-a",
              },
              {
                "id": "c_d77ba138",
                "label": "service-b",
              },
            ],
            "infs": [
              {
                "id": "i_da0fb2ac",
                "label": "rpc",
              },
            ],
            "label": "bff",
            "name": "z_18452e2c",
            "type": "package",
          },
          {
            "components": [
              {
                "id": "c_81c3b080",
                "label": "mysql",
              },
              {
                "id": "c_86a1b907",
                "label": "redis",
              },
            ],
            "infs": [],
            "label": "DataBase",
            "name": "z_c55bea99",
            "type": "database",
          },
          {
            "components": [
              {
                "id": "c_5f075ae3",
                "label": "Go",
              },
            ],
            "infs": [],
            "label": "Node",
            "name": "z_6c3a6944",
            "type": "node",
          },
        ],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
