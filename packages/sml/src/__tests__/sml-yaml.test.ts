import * as sml from '../index'

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
    const { ast, emitter } = sml.YamlDiagram(title, (ml) => {
      ml.highlights(highlights).yaml(content)
    })

    // assert
    expect(ast).toEqual({
      title,
      config: {
        actorStyle: 'awesome',
        direction: 'left->right',
        packageStyle: 'Rectangle',
        theme: 'sketchy-outline',
      },
      highlights,
      yaml: content,
    })

    // emitter
    expect(emitter.emitCode()).toMatchSnapshot()
  })
})
