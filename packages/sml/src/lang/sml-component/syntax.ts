import { Lang } from '../base'
import { SmlComponentAst } from '../types'

const noop = () => {}

class ContainerBuilder {
  constructor(
    private meta: {
      components: Array<{ title: string; name?: string }>
      infs: Array<{ title: string; name?: string }>
    },
  ) {}

  interface(title: string, name?: string) {
    this.meta.infs.push({ title, name })
    return this
  }
  component(title: string, name?: string) {
    this.meta.components.push({ title, name })
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
      components: [] as Array<{ title: string; name?: string }>,
      infs: [] as Array<{ title: string; name: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.nodes.push(ast)
    return this
  }

  database(title: string, fn: (d: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string; name?: string }>,
      infs: [] as Array<{ title: string; name: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.databases.push(ast)
    return this
  }

  cloud(title: string, fn: (c: ContainerBuilder) => void = noop) {
    const ast = {
      title,
      components: [] as Array<{ title: string; name?: string }>,
      infs: [] as Array<{ title: string; name?: string }>,
    }
    fn(new ContainerBuilder(ast))
    this.meta.clouds.push(ast)
    return this
  }

  component(title: string, name?: string) {
    this.meta.components.push({ title, name })
    return this
  }

  interface(title: string, name?: string) {
    this.meta.infs.push({ title, name })
    return this
  }

  link(from: string, to: string) {
    this.meta.links.push({ from, to })
    return this
  }

  vlink(from: string, to: string) {
    this.meta.vlinks.push({ from, to })
    return this
  }

  rel(from: string, to: string) {
    this.meta.rels.push({ from, to })
    return this
  }
}
