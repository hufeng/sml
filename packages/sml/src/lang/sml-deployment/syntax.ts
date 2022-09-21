import { Lang } from '../base'

export class SmlDeploymentLang extends Lang<Sml.DeploymentLangAst> {
  constructor(meta: Sml.DeploymentLangAst) {
    super(meta)
  }

  aritfact(label: string) {
    this.meta.artifacts.push({ title: 'artifact', label })
    return this
  }

  database(label: string) {
    this.meta.databases.push({ title: 'database', label })
    return this
  }

  queue(label: string) {
    this.meta.queues.push({ title: 'queue', label })
    return this
  }

  stack(label: string) {
    this.meta.stacks.push({ title: 'stack', label })
    return this
  }

  actor(label: string) {
    this.meta.actors.push({ title: 'actor', label })
    return this
  }

  boundary(label: string) {
    this.meta.boundary.push({ title: 'boundary', label })
    return this
  }

  interface(label: string) {
    this.meta.infs.push({ title: 'interface', label })
    return this
  }

  hexagon(label: string) {
    this.meta.hexagons.push({ title: '', label })
    return this
  }

  control(label: string) {
    this.meta.controls.push({ title: 'control', label })
    return this
  }

  cloud(label: string) {
    this.meta.clouds.push({ title: 'cloud', label })
    return this
  }

  component(label: string) {
    this.meta.components.push({ title: 'component', label })
    return this
  }

  node(label: string) {
    this.meta.nodes.push({ title: 'node', label })
    return this
  }
}
