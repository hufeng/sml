import { DeploymentDiagram } from '../lang/sml-deployment'

describe('deployment test suite', () => {
  it('test all elements', () => {
    const { emitter } = DeploymentDiagram('hello deployment', (ml) => {
      // actor
      const a1 = ml.actor('Customer').head('actor')

      // registry
      const nz = ml.zone('registry')
      const registry = ml.component('beehive-registry').belongTo(nz)

      // web service
      const web = ml.zone('web-service').type('cloud')
      const nginx = ml.component('nginx').belongTo(web)
      const consumer = ml.component('dubbo-consumer').belongTo(web)
      const queue = ml.queue('request queue').belongTo(web)

      // service
      const rpc = ml.zone('User-Center').type('cloud')
      const loginService = ml
        .collections('login-service')
        .head('RpcService')
        .belongTo(rpc)
      const registryService = ml
        .collections('registry-service')
        .head('RpcService')
        .belongTo(rpc)

      // db
      const dz = ml.zone('persistence').type('database')
      const db = ml.component('mysql').belongTo(dz)

      a1.link(nginx)
      consumer.vlink(registry)
      consumer.link(queue)
      queue.vlink([loginService, registryService])
      loginService.vlink(db)
      registryService.vlink(db)
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })

  it('test artifact cloud database node', () => {
    const { ast, emitter } = DeploymentDiagram('hello more component', (ml) => {
      const a = ml.artifact('artifact')
      const c = ml.cloud('cloud')
      const database = ml.database('db')
      const node = ml.node('node')

      a.link(c)
      c.link(database)
      database.link(node)
    })
    expect(ast).toMatchInlineSnapshot(`
      {
        "components": [
          {
            "head": "artifact",
            "id": "c_8e5b948a",
            "label": "artifact",
            "type": "artifact",
          },
          {
            "head": "cloud",
            "id": "c_a1234b31",
            "label": "cloud",
            "type": "cloud",
          },
          {
            "head": "database",
            "id": "c_d77d5e50",
            "label": "db",
            "type": "database",
          },
          {
            "head": "node",
            "id": "c_36c45369",
            "label": "node",
            "type": "node",
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
            "from": "c_8e5b948a",
            "to": [
              "c_a1234b31",
            ],
          },
          {
            "from": "c_a1234b31",
            "to": [
              "c_d77d5e50",
            ],
          },
          {
            "from": "c_d77d5e50",
            "to": [
              "c_36c45369",
            ],
          },
        ],
        "notes": [],
        "rels": [],
        "title": "hello more component",
        "vlinks": [],
        "zones": [],
      }
    `)
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
