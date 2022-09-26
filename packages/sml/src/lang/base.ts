import path from 'node:path'
import crypto from 'node:crypto'
import { exec } from 'node:child_process'

import S from './s'
import {
  ActorStyleType,
  BaseAst,
  DirectionType,
  GlobalConfigType,
  LinkAst,
  ZoneStyle,
} from './types'

export const noop = () => {}

// ~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~~~~~~~
export class Builder {
  protected id(s: string) {
    const md5 = crypto.createHash('md5')
    return md5.update(s).digest('hex').substring(0, 8)
  }
}

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
  packageStyle(style: ZoneStyle = 'Rectangle') {
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

  /**
   * 设置主题
   * @param theme
   */
  theme(theme: GlobalConfigType['theme'] = 'cerulean-outline') {
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
      theme: 'sketchy-outline',
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
  protected s: S

  constructor(meta: T) {
    this.meta = meta
    this.s = new S()
  }

  abstract emitCode(): string

  protected buildConfig = (s: S) => {
    const { config } = this.meta
    s
      // setting theme
      .$s(`!theme ${config!.theme}`)
      // setting actor style
      .$if(
        config!.actorStyle !== 'default',
        `skinparam actorStyle ${config!.actorStyle}`,
      )
      .$s(`skinparam packageStyle ${config?.packageStyle}`)
      // setting direction
      .$s(`${config!.direction.replace('->', ' to ')} direction\n`)
    return s
  }

  protected buildTheme = (s: S) => {
    const { config } = this.meta
    s.$s(`!theme ${config!.theme}`)
  }

  protected buildLink = (s: S, { from, to, note: link }: LinkAst) => {
    if (typeof link !== 'undefined') {
      s.$for(to, (s, to, i) =>
        s
          .$s(`note "${link.label}" as N${i}`)
          .$s(`(${from}) -- N${i}`)
          .$s(`N${i} --> (${to})`),
      )
    } else {
      s.$for(to, (s, to) => s.$s(`${from} --> ${to}`))
    }
  }

  protected buildVLink = (s: S, { from, to, note: link }: LinkAst) => {
    if (typeof link !== 'undefined') {
      s.$for(to, (s, to, i) =>
        s
          .$s(`note "${link.label}" as N${i}`)
          .$s(`(${from}) .. N${i}`)
          .$s(`N${i} ..> (${to})`),
      )
    } else {
      s.$for(to, (s, to) => s.$s(`${from} ..> ${to}`))
    }
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
