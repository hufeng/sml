import { ComponentDiagram } from '../lang/sml-component'

describe('component diagram test suites', () => {
  it('test all components', () => {
    const { emitter } = ComponentDiagram('component title', (ml) => {
      ml.cloud('cloud', (c) =>
        c.component('Nodejs', 'c1').interface('http', 'i1'),
      )
      ml.package('bff', (p) =>
        p
          .component('service-a', 'c2')
          .component('service-b', 'c3')
          .interface('http', 'i2'),
      )
      ml.database('Database', (d) =>
        d.component('mysql', 'c4').component('redis', 'c5'),
      )
      ml.node('Node', (n) => n.component('Go', 'c6'))

      ml.link('c1', 'c2')
        .link('c2', 'c3')
        .vlink('c3', 'c4')
        .vlink('c4', 'c5')
        .vlink('c5', 'c6')
        .rel('i1', 'c1')
        .rel('i2', 'c3')
    })

    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
