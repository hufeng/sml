import { pmlJson } from '../emitter/puml-json'
import { Json } from '../lang/sml-json'

describe('sml json test suites', () => {
  const title = `hello world`
  const highlights = ['lastName', 'address.city', 'phoneNumbers.0.number']
  const json = {
    firstName: 'John',
    lastName: 'Smith',
    isAlive: true,
    age: 28,
    address: {
      streetAddress: '21 2nd Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10021-3100',
    },
    phoneNumbers: [
      {
        type: 'home',
        number: '212 555-1234',
      },
      {
        type: 'office',
        number: '646 555-4567',
      },
    ],
    children: [],
    spouse: null,
  }

  it('test syntax api', () => {
    // sml json syntax
    const sml = Json(title, (ml) => {
      ml.highlights(highlights).json(json)
    })

    // assert json
    expect((sml as any).meta).toEqual({
      title,
      highlights,
      json,
    })

    const code = pmlJson(sml)
    expect(code).toMatchSnapshot()
  })
})
