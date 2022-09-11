import { Lang } from './sml'
import { globalCollections } from './sml-global'

// ~~~~~~~~~~ basic ~~~~~~~~~~
interface Actor {
  name: string
  label: string
}

interface UseCase {
  name: string
  label: string
}

interface Pkg {
  label: string
  usecases: Array<UseCase>
  actors: Array<Actor>
}

type Link = {
  from: string
  to: Array<string>
}

// ~~~~~~~~~~ compositor ~~~~~~~~~~~~`
interface IScope {
  label: string
  usecases: Array<UseCase>
  actors: Array<Actor>
}

export interface SmlUseCaseMeta {
  title: string
  file: string
  direction: 'left->right' | 'top->down'
  actors: Array<Actor>
  usecases: Array<UseCase>
  pkgs: Array<Pkg>
  rects: Array<IScope>
  links: Array<Link>
}

// ~~~~~~~~~~~~~~~~~ Rectangle ~~~~~~~~~~~~~~~~
class Scope {
  private prop: IScope

  constructor(data: IScope) {
    this.prop = data
  }

  actor(name: string, label: string) {
    this.prop.actors.push({ name, label })
    return this
  }

  usecase(name: string, label: string) {
    this.prop.usecases.push({ name, label })
    return this
  }
}

// ~~~~~~~~~ Sml Use case ~~~~~~~~~~~~~~~
export class SmlUseCase extends Lang {
  private meta: SmlUseCaseMeta

  constructor(title: string) {
    super(title)
    this.meta = {
      title,
      file: '',
      direction: 'left->right',
      actors: [],
      usecases: [],
      pkgs: [],
      rects: [],
      links: [],
    }
  }

  direction(direction: 'left->right' | 'top->down') {
    this.meta.direction = direction
  }

  actor(name: string, label: string) {
    const actor = { name, label }
    this.meta.actors.push(actor)
    return this
  }

  usecase(name: string, label: string) {
    const usecase = { name, label }
    this.meta.usecases.push(usecase)
    return this
  }

  linkMany(from: string, to: Array<string>) {
    this.meta.links = [...this.meta.links, { from, to }]
    return this
  }

  link(from: string, to: string) {
    this.meta.links = [...this.meta.links, { from, to: [to] }]
  }

  pkgScope(label: string, fn: (s: Scope) => void) {
    const data = {
      label,
      usecases: [],
      actors: [],
    }

    const scope = new Scope(data)
    fn(scope)

    this.meta.pkgs.push(data)
    return this
  }

  rectScope(label: string, fn: (s: Scope) => void) {
    const data = { label, usecases: [], actors: [] } as IScope

    const rect = new Scope(data)
    fn(rect)

    this.meta.rects.push(data)
    return this
  }
}

//~~~~~~~~~~~~ factory ~~~~~~~~~~~~~~~
export function Usecase(title: string, fn: (ml: SmlUseCase) => void) {
  const usecase = new SmlUseCase(title)
  fn(usecase)
  globalCollections.add(usecase)
  return usecase
}
