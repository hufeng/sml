import { Lang } from './sml'
import { globalCollections } from './sml-global'

const noop = () => {}

// ~~~~~~~~~~ basic ~~~~~~~~~~
type ID = string
type Actor = { label: string; name: string }
type UseCase = { label: string; name: string }

type ActorStyleType = 'default' | 'awesome' | 'Hollow'
type DirectionType = 'left->right' | 'top->down'
type Postion = 'top' | 'right' | 'bottom' | 'left'
type PackageStyle =
  | 'Node'
  | 'Rectangle'
  | 'Folder'
  | 'Frame'
  | 'Cloud'
  | 'DataBase'

// ~~~~~~~~~~ composite ~~~~~~~~~~~~~~~
interface PacakgeType {
  label: string
  type: PackageStyle
  actors: Array<Actor>
  usecases: Array<UseCase>
}
type Link = {
  from: string
  to: Array<string>
}
type Note = {
  label: string
  position: Postion
  on: ID | { from: ID; to: ID }
}

export interface SmlUseCaseMeta {
  title: string
  config: {
    actorStyle: ActorStyleType
    direction: DirectionType
    packageStyle: PackageStyle
  }
  actors: Array<Actor>
  usecases: Array<UseCase>
  packages: Array<PacakgeType>
  links: Array<Link>
  notes: Array<Note>
}

class PackageBuilder {
  private prop: PacakgeType

  constructor(data: PacakgeType) {
    this.prop = data
  }

  actor(label: string, name: string = '') {
    this.prop.actors.push({ name, label })
    return this
  }

  usecase(label: string, name: string = '') {
    this.prop.usecases.push({ name, label })
    return this
  }
}

class ConfigBuilder {
  private config: SmlUseCaseMeta['config']

  constructor(config: SmlUseCaseMeta['config']) {
    this.config = config
  }

  actorStyle(style: ActorStyleType = 'default') {
    this.config.actorStyle = style
    return this
  }

  packageStyle(style: PackageStyle = 'Rectangle') {
    this.config.packageStyle = style
    return this
  }

  direction(direction: DirectionType) {
    this.config.direction = direction
  }
}

// ~~~~~~~~~ Sml Use case ~~~~~~~~~~~~~~~
export class SmlUseCase extends Lang {
  private meta: SmlUseCaseMeta

  constructor(title: string) {
    super(title)
    this.meta = {
      title,
      config: {
        actorStyle: 'default',
        direction: 'left->right',
        packageStyle: 'Rectangle',
      },
      actors: [],
      usecases: [],
      packages: [],
      links: [],
      notes: [],
    }
  }

  get config() {
    return new ConfigBuilder(this.meta.config)
  }

  actor(
    label: string,
    name: string = '',
    note: (a: { name: string }) => void = noop,
  ) {
    this.meta.actors.push({ label, name })
    if (name !== '') {
      note({ name })
    }
    return this
  }

  usecase(
    label: string,
    name: string = '',
    note: (u: { name: string }) => void = noop,
  ) {
    this.meta.usecases.push({ label, name })
    if (name !== '') {
      note({ name })
    }
    return this
  }

  package(label: string, type: PackageStyle = 'Rectangle') {
    const data = {
      label,
      type,
      usecases: [],
      actors: [],
    }
    this.meta.packages.push(data)
    return new PackageBuilder(data)
  }

  linkMany(
    from: string,
    to: Array<string>,
    note: (l: { from: ID; to: Array<ID> }) => void = noop,
  ) {
    this.meta.links = [...this.meta.links, { from, to }]
    note({ from, to })
    return this
  }

  link(
    from: string,
    to: string,
    note: (l: { from: ID; to: Array<ID> }) => void = noop,
  ) {
    this.meta.links = [...this.meta.links, { from, to: [to] }]
    note({ from, to: [to] })
    return this
  }

  noteOf = (label: string, position: Postion = 'right') => {
    return (c: { name: string }) =>
      this.meta.notes.push({ label, position, on: c.name })
  }

  noteLink = (label: string, position: Postion = 'right') => {
    return (c: Link) => {
      for (let t of c.to) {
        this.meta.notes.push({
          label,
          position,
          on: { from: c.from, to: t },
        })
      }
    }
  }
}

//~~~~~~~~~~~~ factory ~~~~~~~~~~~~~~~
export function Usecase(title: string, fn: (ml: SmlUseCase) => void) {
  const usecase = new SmlUseCase(title)
  fn(usecase)
  globalCollections.add(usecase)
  return usecase
}
