import path from 'node:path'
import { exec } from 'node:child_process'
import Builder from '../common/builder'
import {
  ActorStyleType,
  BaseAst,
  DirectionType,
  GlobalConfigType,
  PackageStyle,
} from './types'

export const noop = () => {}

// ~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~~~~~~~
class ConfigBuilder {
  private config: GlobalConfigType

  constructor(config: GlobalConfigType) {
    this.config = config
  }

  /**
   * setting actor style
   * @param style
   * @returns
   */
  actorStyle(style: ActorStyleType = 'default') {
    this.config.actorStyle = style
    return this
  }

  /**
   * setting package style
   * @param style
   * @returns
   */
  packageStyle(style: PackageStyle = 'Rectangle') {
    this.config.packageStyle = style
    return this
  }

  /**
   * setting direction
   * @param direction
   */
  direction(direction: DirectionType) {
    this.config.direction = direction
  }

  theme(theme: string = 'cerulean-outline') {
    this.config.theme = theme
  }
}

// ~~~~~~~~~~ lang base ~~~~~~~~~~~~~~~~

/**
 * all lang base class
 */
export class Lang<T extends { title: string; config?: GlobalConfigType }> {
  protected meta: T

  constructor(meta: T) {
    this.meta = meta
    this.meta.config = {
      actorStyle: 'default',
      direction: 'left->right',
      packageStyle: 'Rectangle',
      theme: 'cerulean-outline',
    }
  }

  get configuration() {
    return new ConfigBuilder(this.meta.config!)
  }
}

/**
 * all Emitter base class
 */
export abstract class Emitter<T extends BaseAst> {
  protected meta: T
  protected s: Builder

  constructor(meta: T) {
    this.meta = meta
    this.s = new Builder()
  }

  abstract emitCode(): string

  protected emitConfig() {
    const { config } = this.meta
    // setting actor style
    this.s
      .ifStr(
        config!.actorStyle !== 'default',
        `skinparam actorStyle ${config!.actorStyle}`,
      )
      // setting direction
      .str(`${config!.direction.replace('->', ' to ')} direction\n`)
    // FIXME lose package style
  }

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
