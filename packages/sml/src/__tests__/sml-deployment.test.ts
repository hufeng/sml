import { DeploymentDiagram } from '../lang/sml-deployment'

describe('deployment test suite', () => {
  it('test all elements', () => {
    const { emitter } = DeploymentDiagram('hello deployment', (ml) => {
      // actor
      const a1 = ml.actor('Customer').head('actor')

      // registry
      const nz = ml.zone('registry').type('cloud')
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
})
