import sml from '../index'
import { SmlUseCaseMeta } from '../lang/sml-usecase'
import { PumlUseCaseEmitter } from '../emitter/puml-usecase'

describe('sml usercase test suites', () => {
  const title = 'hello usercase diagram'

  it('test only usercases', () => {
    const usercase = sml.Usecase(title, (ml) => {
      ml.usecase('u1', 'blog').usecase('u2', 'music').usecase('u3', 'play')
    })

    const meta = (usercase as any).meta as SmlUseCaseMeta
    expect(meta.usecases).toEqual([
      {
        name: 'u1',
        label: 'blog',
      },
      { name: 'u2', label: 'music' },
      { name: 'u3', label: 'play' },
    ])

    const code = new PumlUseCaseEmitter(usercase).emitCode()
    expect(code).toMatchSnapshot()
  })

  it('only actor', () => {
    const usercase = sml.Usecase(title, (ml) => {
      ml.actor('user1', 'first actor')
        .actor('user2', 'another actor')
        .actor('user3', 'Last actor')
    })

    const meta = (usercase as any).meta as SmlUseCaseMeta
    expect(meta.actors).toEqual([
      {
        name: 'user1',
        label: 'first actor',
      },
      { name: 'user2', label: 'another actor' },
      { name: 'user3', label: 'Last actor' },
    ])

    const code = new PumlUseCaseEmitter(usercase).emitCode()
    expect(code).toMatchSnapshot()
  })

  it('test rect', () => {
    const usercase = sml.Usecase(title, (ml) => {
      ml.actor('fc', 'Food Critic')
        .rectScope('Restaurant', (s) =>
          s
            .usecase('uc1', 'Eat Food')
            .usecase('uc2', 'Pay for food')
            .usecase('uc3', 'Drink'),
        )
        .linkMany('fc', ['uc1', 'uc2', 'uc3'])
    })
    const meta = (usercase as any).meta as SmlUseCaseMeta
    expect(meta).toEqual({
      title,
      file: '',
      direction: 'left->right',
      pkgs: [],
      usecases: [],
      actors: [{ name: 'fc', label: 'Food Critic' }],
      rects: [
        {
          label: 'Restaurant',
          actors: [],
          usecases: [
            { name: 'uc1', label: 'Eat Food' },
            { name: 'uc2', label: 'Pay for food' },
            { name: 'uc3', label: 'Drink' },
          ],
        },
      ],
      links: [{ from: 'fc', to: ['uc1', 'uc2', 'uc3'] }],
    })
    const code = new PumlUseCaseEmitter(usercase).emitCode()
    expect(code).toMatchSnapshot()
  })

  it('test packages', () => {
    const usecase = sml.Usecase(title, (ml) => {
      ml.actor('g', 'guest')
        .rectScope(`Restaurant`, (s) =>
          s.usecase('uc1', 'Eat Food').usecase('uc2', 'Pay for food'),
        )
        .pkgScope('Professional', (s) => s.actor('a', 'Chef'))
        .linkMany('g', ['uc1', 'uc2', 'uc3'])
        .link('a', 'uc1')
    })
    const code = new PumlUseCaseEmitter(usecase).emitCode()
    expect(code).toMatchSnapshot()
  })
})
