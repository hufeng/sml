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
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
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
                "type": "component",
              },
              {
                "id": "i_80791b3a",
                "label": "http",
                "type": "interface",
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
                "type": "component",
              },
              {
                "id": "c_d77ba138",
                "label": "service-b",
                "type": "component",
              },
              {
                "id": "i_da0fb2ac",
                "label": "rpc",
                "type": "interface",
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
                "type": "component",
              },
              {
                "id": "c_86a1b907",
                "label": "redis",
                "type": "component",
              },
            ],
            "label": "DataBase",
            "name": "z_c55bea99",
            "type": "database",
          },
          {
            "components": [
              {
                "id": "c_5f075ae3",
                "label": "Go",
                "type": "component",
              },
            ],
            "label": "Node",
            "name": "z_6c3a6944",
            "type": "node",
          },
        ],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test has', () => {
    const { ast, emitter } = ComponentDiagram('component diagram', (ml) => {
      const bls = ml.zone('bls').type('package')
      const c1 = ml.component('Repository')
      const c2 = ml.component('LoginDataSource')
      const i1 = ml.interface('getLoginDS')
      const i2 = ml.interface('ILoginDS')
      bls.has(c1, c2, i1, i2)

      c1.vlink(c2)
      c1.vlink(i1)
      c2.vlink(i2)
      i1.vlink(i2)

      const vm = ml.zone('vm')
      const c3 = ml.component('ViewModelFactory').belongTo(vm)
      const c4 = ml.component('AppViewModel').belongTo(vm)
      const i3 = ml.interface('getLoginVM').belongTo(vm)
      const i4 = ml.interface('ILoginVM').belongTo(vm)

      c3.rel(i1).rel(i2)
      i3.vlink(i4)
      i4.vlink(c4)
      c3.vlink(c4)

      const app = ml.zone('app')
      ml.component('MainActivity').belongTo(app)
      const c6 = ml.component('LoginActivity').belongTo(app)

      c6.rel([i3, i4])
    })

    expect(ast).toMatchInlineSnapshot(`
      {
        "components": [],
        "config": {
          "actorStyle": "awesome",
          "direction": "left->right",
          "packageStyle": "Rectangle",
          "theme": "sketchy-outline",
        },
        "links": [],
        "notes": [],
        "rels": [
          {
            "from": "c_02658109",
            "to": [
              "i_acfd60a8",
            ],
          },
          {
            "from": "c_02658109",
            "to": [
              "i_c062b511",
            ],
          },
          {
            "from": "c_d8a28ff5",
            "to": [
              "i_20445edb",
              "i_ac37107e",
            ],
          },
        ],
        "title": "component diagram",
        "vlinks": [
          {
            "from": "c_33fcf2b3",
            "to": [
              "c_0dc28396",
            ],
          },
          {
            "from": "c_33fcf2b3",
            "to": [
              "i_acfd60a8",
            ],
          },
          {
            "from": "c_0dc28396",
            "to": [
              "i_c062b511",
            ],
          },
          {
            "from": "i_acfd60a8",
            "to": [
              "i_c062b511",
            ],
          },
          {
            "from": "i_20445edb",
            "to": [
              "i_ac37107e",
            ],
          },
          {
            "from": "i_ac37107e",
            "to": [
              "c_4faf9542",
            ],
          },
          {
            "from": "c_02658109",
            "to": [
              "c_4faf9542",
            ],
          },
        ],
        "zones": [
          {
            "components": [
              {
                "id": "c_33fcf2b3",
                "label": "Repository",
                "type": "component",
              },
              {
                "id": "c_0dc28396",
                "label": "LoginDataSource",
                "type": "component",
              },
              {
                "id": "i_acfd60a8",
                "label": "getLoginDS",
                "type": "interface",
              },
              {
                "id": "i_c062b511",
                "label": "ILoginDS",
                "type": "interface",
              },
            ],
            "label": "bls",
            "name": "z_d5ff4b9a",
            "type": "package",
          },
          {
            "components": [
              {
                "id": "c_02658109",
                "label": "ViewModelFactory",
                "type": "component",
              },
              {
                "id": "c_4faf9542",
                "label": "AppViewModel",
                "type": "component",
              },
              {
                "id": "i_20445edb",
                "label": "getLoginVM",
                "type": "interface",
              },
              {
                "id": "i_ac37107e",
                "label": "ILoginVM",
                "type": "interface",
              },
            ],
            "label": "vm",
            "name": "z_686c821a",
            "type": "package",
          },
          {
            "components": [
              {
                "id": "c_db3a4a28",
                "label": "MainActivity",
                "type": "component",
              },
              {
                "id": "c_d8a28ff5",
                "label": "LoginActivity",
                "type": "component",
              },
            ],
            "label": "app",
            "name": "z_d2a57dc1",
            "type": "package",
          },
        ],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
