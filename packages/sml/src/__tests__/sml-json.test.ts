import { pmlJson } from '../emitter/puml-json'
import { json } from '../lang/sml-json'

describe('sml json test suites', () => {
  it('test syntax api', () => {
    // sml json syntax
    const sml = json(`hello world`, (ml) => {
      ml.highlights(['lastName', 'address.city', 'phoneNumbers.0.number'])
      ml.json({
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
      })
    })

    json('hello', (ml) => {
      ml.highlights(['hello']).json({
        hello: 'world',
      })
    })

    // assert json
    expect((sml as any).meta).toEqual({
      title: 'hello world',
      highlights: ['lastName', 'address.city', 'phoneNumbers.0.number'],
      json: {
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
      },
    })

    const code = pmlJson(sml)
    console.log(code)
  })
})
