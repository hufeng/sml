import { ComponentDiagram } from '../lang/sml-component'

describe('component diagram test suites', () => {
  it('test all components', () => {
    const { emitter } = ComponentDiagram('component title', (ml) => {
      // elements
      const cloud = ml.zoneCloud('cloud')
      const c1 = ml.component('Nodejs')
      const i1 = ml.interface('http')
      cloud.has(c1, i1)

      const zone = ml.zone('bff')
      const c2 = ml.component('service-a')
      const c3 = ml.component('service-b')
      const i2 = ml.interface('rpc')
      zone.has(c2, c3, i2)

      const db = ml.zoneDatabase('DataBase')
      const c4 = ml.component('mysql')
      const c5 = ml.component('redis')
      db.has(c4, c5)

      const node = ml.zoneNode('Node')
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

    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
