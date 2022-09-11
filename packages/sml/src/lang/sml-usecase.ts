import { Lang } from './sml'
import { globalCollections } from './sml-global'

// ~~~~~~~~~~ basic ~~~~~~~~~~
type Base = { name: string; label: string }
type Actor = Base
type UseCase = Base

interface Pkg {
  label: string
  usecases: Array<UseCase>
  actors: Array<Actor>
}

type Link = {
  from: string
  to: Array<string>
}

type Note = {
  label: string
  position: string
  on: Name | { from: Name; to: Name }
}

type Name = string
type ActorStyleType = 'default' | 'awesome' | 'Hollow'
type DirectionType = 'left->right' | 'top->down'
type Postion = 'top' | 'right' | 'bottom' | 'left'

// ~~~~~~~~~~ compositor ~~~~~~~~~~~~`
interface IScope {
  label: string
  usecases: Array<UseCase>
  actors: Array<Actor>
  notes: Array<Note>
}

export interface SmlUseCaseMeta {
  title: string
  file: string
  actorStyle: ActorStyleType
  direction: DirectionType
  actors: Array<Actor>
  usecases: Array<UseCase>
  pkgs: Array<Pkg>
  rects: Array<IScope>
  links: Array<Link>
  notes: Array<Note>
}

class Basic {
  private n: Note

  constructor(n: Note) {
    this.n = n
  }

  note(label: string, position: Postion = 'right') {
    this.n = { ...this.n, label, position }
  }
}

class Scope {
  private prop: IScope

  constructor(data: IScope) {
    this.prop = data
  }

  actor(name: string, label: string, fn?: (c: Basic) => void) {
    this.prop.actors.push({ name, label })
    if (typeof fn !== 'undefined') {
      const note = { label: '', position: 'right', on: name }
      const b = new Basic(note)
      this.prop.notes.push(note)
      fn(b)
    }
    return this
  }

  usecase(name: string, label: string, fn?: (c: Basic) => void) {
    this.prop.usecases.push({ name, label })

    if (typeof fn !== 'undefined') {
      const note = { label: '', position: 'right', on: name }
      const b = new Basic(note)
      fn(b)
      this.prop.notes.push(note)
    }
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
      actorStyle: 'default',
      direction: 'left->right',
      actors: [],
      usecases: [],
      pkgs: [],
      rects: [],
      links: [],
      notes: [],
    }
  }

  actorStyle(style: ActorStyleType = 'default') {
    this.meta.actorStyle = style
    return this
  }

  direction(direction: DirectionType) {
    this.meta.direction = direction
  }

  actor(name: string, label: string, fn?: (c: Basic) => void) {
    const actor = { name, label }
    this.meta.actors.push(actor)

    if (typeof fn !== 'undefined') {
      const note = { label: '', position: 'right', on: name }
      new Basic(note)
      this.meta.notes.push(note)
    }

    return this
  }

  usecase(name: string, label: string, fn?: (c: Basic) => void) {
    const usecase = { name, label }
    this.meta.usecases.push(usecase)

    if (typeof fn !== 'undefined') {
      const note = { label: '', position: 'right', on: name }
      new Basic(note)
      this.meta.notes.push(note)
    }

    return this
  }

  linkMany(from: string, to: Array<string>) {
    this.meta.links = [...this.meta.links, { from, to }]
    return this
  }

  link(from: string, to: string, fn?: (c: Basic) => void) {
    this.meta.links = [...this.meta.links, { from, to: [to] }]
    if (typeof fn !== 'undefined') {
      const note = { label: '', position: 'right', on: { from, to } } as Note
      const b = new Basic(note)
      fn(b)
      this.meta.notes.push(note)
    }
  }

  pkgScope(label: string, fn: (c: Scope) => void) {
    const data = {
      label,
      usecases: [],
      actors: [],
      notes: [],
    } as IScope

    const scope = new Scope(data)
    fn(scope)

    this.meta.pkgs.push(data)
    return this
  }

  rectScope(label: string, fn: (c: Scope) => void) {
    const data = { label, usecases: [], actors: [], notes: [] } as IScope
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
