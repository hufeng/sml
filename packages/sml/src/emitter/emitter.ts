import path from 'node:path'
import { exec } from 'node:child_process'
import Builder from '../common/builder'

export abstract class Emitter<T> {
  protected sml: T
  protected s: Builder

  constructor(sml: T) {
    this.sml = sml
    this.s = new Builder()
  }

  abstract emitCode(): string

  plantUML(img: string) {
    const jar = path.join(__dirname, '../../bin/plantuml-1.2022.7.jar')

    exec(
      `${this.emitCode()} | java -jar ${jar} -pipe > ${img}`,
      (err, stdout, stderr) => {
        if (err) {
          throw err
        }
        console.log(stdout)
        console.log(stderr)
      },
    )
  }
}
