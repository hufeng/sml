import sml from '../index'
import { pmlYaml } from '../emitter/puml-yaml'

describe('sml yaml test suites', () => {
  const title = 'hello yaml demo'
  const highlights = ['french-hens', 'xmas-fifth-day.partridges']
  const content = `doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds: 
	- huey
	- dewey
	- louie
	- fred
xmas-fifth-day: 
	calling-birds: four
	french-hens: 3
	golden-rings: 5
	partridges: 
		count: 1
		location: "a pear tree"
	turtle-doves: two`

  it('test full pipeline', () => {
    const yaml = sml.Yaml(title, (ml) => {
      ml.highlights(highlights).yaml(content)
    })

    // assert
    expect((yaml as any).meta).toEqual({
      title,
      highlights,
      yaml: content,
    })

    // emitter
    const code = pmlYaml(yaml)
    expect(code).toMatchSnapshot()
  })
})
