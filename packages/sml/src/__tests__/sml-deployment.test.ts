import { DeploymentDiagram } from '../lang/sml-deployment'

describe('deployment test suite', () => {
  it('test all elements', () => {
    const { emitter } = DeploymentDiagram('hello deployment', (ml) => {
      ml.actor('Customer')
        .actor('Guest')
        .aritfact(`beehive-service`)
        .aritfact('beehive-consumer')
        .boundary(`end`)
        .cloud('Network')
        .component('beehive-registry')
        .control(`control`)
        .database('mysql')
        .interface('invoke-service')
        .node(`127.0.0.1`)
        .queue('queue')
        .stack('mem')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
