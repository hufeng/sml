import Builder from '../common/builder'

export abstract class Emitter<T> {
  protected sml: T
  protected s: Builder

  constructor(sml: T) {
    this.sml = sml
    this.s = new Builder()
  }

  abstract emitCode(): string
}
