import { DeploymentDiagram } from '../lang/sml-deployment'

describe('deployment test suite', () => {
  it('test all elements', () => {
    const { emitter } = DeploymentDiagram('hello deployment', (ml) => {
      ml.actor('Customer', 'a1')
        .actor('Guest', 'a2')
        .artifact(`beehive-service`, (a) => a.name('a3'))
        .artifact('beehive-consumer', (a) => a.name('a4'))
        .boundary(`end`, 'a5')
        .cloud('Network')
        .component('beehive-registry')
        .control(`control`)
        .database('mysql')
        .interface('invoke-service')
        .node(`127.0.0.1`)
        .queue('queue')
        .stack('mem')

      ml.link('a1', 'a3').vlink('a2', 'a4')
    })
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
