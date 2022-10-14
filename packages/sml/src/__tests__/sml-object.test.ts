import * as sml from '../index'

describe('sml object diagram test suites', () => {
  it('test object', () => {
    const { emitter } = sml.ObjectDiagram('object diagram', (ml) => {
      const o1 = ml.object('user').field('id', '1').field('name', 'test')
      const o2 = ml
        .object('address')
        .field('province', 'jiangsu')
        .field('city', 'nanjing')
      o1.compose(o2)
    })

    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml object_diagram
      left to right direction

      !theme sketchy-outline

      object \\"user\\" as o_ee11cbb1 {
        id : 1
        name : test
      }
      object \\"address\\" as o_884d9804 {
        province : jiangsu
        city : nanjing
      }

      o_884d9804 *-- o_ee11cbb1
      @enduml"
    `)
  })

  it('test map ', () => {
    const { emitter } = sml.ObjectDiagram('object', (ml) => {
      ml.map('CapitalCity')
        .field(`UK`, 'London')
        .field('USA', 'Washington')
        .field(`Germany`, 'Berlin')
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml object
      left to right direction

      !theme sketchy-outline

      map \\"CapitalCity\\" as o_7e847438 {
        UK => London
        USA => Washington
        Germany => Berlin
      }

      @enduml"
    `)
  })

  it('test obj and map link', () => {
    const { emitter } = sml.ObjectDiagram('object', (ml) => {
      const l = ml.object(`London`)
      const w = ml.object(`Washington`)
      const b = ml.object(`Berlin`)
      const n = ml.object(`Network`)

      const m = ml
        .map('CapitalCity')
        .field(`UK`, l)
        .field('USA', w)
        .field(`Germany`, b)

      n.linkMap(m, 'USA')
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml object
      left to right direction

      !theme sketchy-outline

      object \\"London\\" as o_59ead8d1 {
      }
      object \\"Washington\\" as o_6d69689d {
      }
      object \\"Berlin\\" as o_ee1611b6 {
      }
      object \\"Network\\" as o_eec89088 {
      }
      map \\"CapitalCity\\" as o_7e847438 {
        UK *--> o_59ead8d1
        USA *--> o_6d69689d
        Germany *--> o_ee1611b6
      }

      o_eec89088 --> o_7e847438::USA
      @enduml"
    `)
  })

  it('map link field', () => {
    const { emitter } = sml.ObjectDiagram('test link field', (ml) => {
      const f = ml.object('Foo')
      const b = ml.object('Baz')

      const m = ml.map('Bar').field('abc', b).field('def', '')
      f.linkMap(m, 'def')
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_link_field
      left to right direction

      !theme sketchy-outline

      object \\"Foo\\" as o_1356c67d {
      }
      object \\"Baz\\" as o_f8dce67f {
      }
      map \\"Bar\\" as o_ddc35f88 {
        abc *--> o_f8dce67f
        def => 
      }

      o_1356c67d --> o_ddc35f88::def
      @enduml"
    `)
  })

  it('test complex diagram', () => {
    const { emitter } = sml.ObjectDiagram('test link field', (ml) => {
      const o = ml.map('Kick.Off').field('Start', 'End')
      const t1 = ml.map('task.1').field('Start', 'End')
      const t2 = ml.map('task.2').field('Start', 'End')
      const t3 = ml.map('task.3').field('Start', 'End')
      const t4 = ml.map('task.4').field('Start', 'End')
      const t5 = ml.map('task.5').field('Start', 'End')

      o.link([t1, t2, t3], '', (l) => l.commentOf('Label'))
      t1.link(t4)
      t2.link(t4)
      t3.link(t4)
      t4.link(t5, '', (l) => l.commentOf('Label 4'))
    })
    expect(emitter.emitPuml()).toMatchInlineSnapshot(`
      "@startuml test_link_field
      left to right direction

      !theme sketchy-outline

      map \\"Kick.Off\\" as o_1ea62dd1 {
        Start => End
      }
      map \\"task.1\\" as o_48960d27 {
        Start => End
      }
      map \\"task.2\\" as o_5e862402 {
        Start => End
      }
      map \\"task.3\\" as o_f341993d {
        Start => End
      }
      map \\"task.4\\" as o_421d90d0 {
        Start => End
      }
      map \\"task.5\\" as o_9960050b {
        Start => End
      }

      o_1ea62dd1 --> o_48960d27 : Label
      o_1ea62dd1 --> o_5e862402 : Label
      o_1ea62dd1 --> o_f341993d : Label
      o_48960d27 --> o_421d90d0
      o_5e862402 --> o_421d90d0
      o_f341993d --> o_421d90d0
      o_421d90d0 --> o_9960050b : Label 4
      @enduml"
    `)
  })
})
