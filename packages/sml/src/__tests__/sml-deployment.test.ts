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

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_deployment
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello deployment

      actor \\"Customer\\" as c_ce26601d <<actor>>
      component \\"registry\\" as z_a9205dcf <<zone>> {
        component \\"beehive-registry\\" as c_4dd942bb <<component>>
      }
      cloud \\"web-service\\" as z_82daadfb <<cloud>> {
        component \\"nginx\\" as c_ee434023 <<component>>
        component \\"dubbo-consumer\\" as c_fc2d8b3d <<component>>
        queue \\"request queue\\" as c_9ad4f252 <<queue>>
      }
      cloud \\"User-Center\\" as z_42fac19d <<cloud>> {
        collections \\"login-service\\" as c_b615bcf7 <<RpcService>>
        collections \\"registry-service\\" as c_11289165 <<RpcService>>
      }
      database \\"persistence\\" as z_3a6988a0 <<database>> {
        component \\"mysql\\" as c_81c3b080 <<component>>
      }
      c_ce26601d --> c_ee434023
      c_fc2d8b3d --> c_9ad4f252
      c_fc2d8b3d ..> c_4dd942bb
      c_9ad4f252 ..> c_b615bcf7
      c_9ad4f252 ..> c_11289165
      c_b615bcf7 ..> c_81c3b080
      c_11289165 ..> c_81c3b080

      @enduml"
    `)

    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## hello deployment

      \`\`\`plantuml

      @startuml hello_deployment
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello deployment

      actor \\"Customer\\" as c_ce26601d <<actor>>
      component \\"registry\\" as z_a9205dcf <<zone>> {
        component \\"beehive-registry\\" as c_4dd942bb <<component>>
      }
      cloud \\"web-service\\" as z_82daadfb <<cloud>> {
        component \\"nginx\\" as c_ee434023 <<component>>
        component \\"dubbo-consumer\\" as c_fc2d8b3d <<component>>
        queue \\"request queue\\" as c_9ad4f252 <<queue>>
      }
      cloud \\"User-Center\\" as z_42fac19d <<cloud>> {
        collections \\"login-service\\" as c_b615bcf7 <<RpcService>>
        collections \\"registry-service\\" as c_11289165 <<RpcService>>
      }
      database \\"persistence\\" as z_3a6988a0 <<database>> {
        component \\"mysql\\" as c_81c3b080 <<component>>
      }
      c_ce26601d --> c_ee434023
      c_fc2d8b3d --> c_9ad4f252
      c_fc2d8b3d ..> c_4dd942bb
      c_9ad4f252 ..> c_b615bcf7
      c_9ad4f252 ..> c_11289165
      c_b615bcf7 ..> c_81c3b080
      c_11289165 ..> c_81c3b080

      @enduml

      \`\`\`
      "
    `)
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
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml hello_more_component
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello more component

      artifact \\"artifact\\" as c_8e5b948a <<artifact>>
      cloud \\"cloud\\" as c_a1234b31 <<cloud>>
      database \\"db\\" as c_d77d5e50 <<database>>
      node \\"node\\" as c_36c45369 <<node>>
      c_8e5b948a --> c_a1234b31
      c_a1234b31 --> c_d77d5e50
      c_d77d5e50 --> c_36c45369

      @enduml"
    `)

    expect(emitter.emitMarkdown()).toMatchInlineSnapshot(`
      "## hello more component

      \`\`\`plantuml

      @startuml hello_more_component
      !theme sketchy-outline
      skinparam actorStyle awesome
      skinparam packageStyle Rectangle
      left to right direction

      title hello more component

      artifact \\"artifact\\" as c_8e5b948a <<artifact>>
      cloud \\"cloud\\" as c_a1234b31 <<cloud>>
      database \\"db\\" as c_d77d5e50 <<database>>
      node \\"node\\" as c_36c45369 <<node>>
      c_8e5b948a --> c_a1234b31
      c_a1234b31 --> c_d77d5e50
      c_d77d5e50 --> c_36c45369

      @enduml

      \`\`\`
      "
    `)
  })
})
