import { Lang } from '../base'
import { SmlComponentAst } from '../types'

const noop = () => {}

class ContainerBuilder {
  constructor(
    private meta: {
      components: Array<{ title: string }>
      infs: Array<{ title: string }>
    },
  ) {}

  interface(title: string) {
    this.meta.infs.push({ title })
    return this
  }
  component(title: string) {
    this.meta.components.push({ title })
    return this
  }
}

export class SmlComponentLang extends Lang<SmlComponentAst> {
  constructor(meta: SmlComponentAst) {
    super(meta)
  }

  package(title: string, fn: (p: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string }>,
      infs: [] as Array<{ title: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.packages.push(ast)
    return this
  }

  node(title: string, fn: (n: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string }>,
      infs: [] as Array<{ title: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.nodes.push(ast)
    return this
  }

  database(title: string, fn: (d: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string }>,
      infs: [] as Array<{ title: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.databases.push(ast)
    return this
  }

  cloud(title: string, fn: (c: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string }>,
      infs: [] as Array<{ title: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.clouds.push(ast)
    return this
  }

  component(title: string) {
    this.meta.components.push({ title })
    return this
  }

  interface(title: string) {
    this.meta.infs.push({ title })
    return this
  }
}
