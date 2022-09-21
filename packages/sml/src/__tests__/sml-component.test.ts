import { ComponentDiagram } from '../lang/sml-component'

describe('component diagram test suites', () => {
  it('test all components', () => {
    const { emitter } = ComponentDiagram('component title', (ml) => {
      ml.cloud('cloud', (c) => c.component('Nodejs').interface('http'))
      ml.package('bff', (p) =>
        p.component('service-a').component('service-b').interface('http'),
      )
      ml.database('Database', (d) => d.component('mysql').component('redis'))
      ml.node('Node', (n) => n.component('Go'))
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
