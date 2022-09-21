import { Lang } from '../base'
import {
  PackageAst,
  UseCaseDiagramAst,
  PackageStyle,
  ID,
  Postion,
  LinkAst,
} from '../types'

const noop = () => {}

// ~~~~~~~~~~~~~~~` builder ~~~~~~~~~~~
class PackageBuilder {
  private prop: PackageAst

  constructor(data: PackageAst) {
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

// ~~~~~~~~~ define usecase lang modeling ~~~~~~~~~~~~~~~
export class SmlUseCaseLang extends Lang<UseCaseDiagramAst> {
  constructor(meta: UseCaseDiagramAst) {
    super(meta)
  }

  /**
   * define actor
   * @param label
   * @param name
   * @param note
   * @returns
   */
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

  /**
   * define usecase
   * @param label
   * @param name
   * @param note
   * @returns
   */
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

  /**
   * setting package scope
   * @param label
   * @param type
   * @returns
   */
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

  /**
   * link one actor to multiple usecases
   * @param from
   * @param to
   * @param note
   * @returns
   */
  linkMany(
    from: string,
    to: Array<string>,
    note: (l: { from: ID; to: Array<ID> }) => void = noop,
  ) {
    this.meta.links = [...this.meta.links, { from, to }]
    note({ from, to })
    return this
  }

  /**
   * link actor to usecase
   * @param from
   * @param to
   * @param note
   * @returns
   */
  link(
    from: string,
    to: string,
    note: (l: { from: ID; to: Array<ID> }) => void = noop,
  ) {
    this.meta.links = [...this.meta.links, { from, to: [to] }]
    note({ from, to: [to] })
    return this
  }

  /**
   * note optional for actor or package
   * @param label
   * @param position
   * @returns
   */
  noteOf = (label: string, position: Postion = 'right') => {
    return (c: { name: string }) =>
      this.meta.notes.push({ label, position, on: c.name })
  }

  /**
   * note link optional
   * @param label
   * @param position
   * @returns
   */
  noteLink = (label: string, position: Postion = 'right') => {
    return (c: LinkAst) => {
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
