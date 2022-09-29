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
  NoteAst,
  Position,
  RelAst,
  Theme,
  ZoneType,
} from './types'

// ~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~~~~~~~
export class Builder {
  protected id(s: string) {
    const md5 = crypto.createHash('md5')
    return md5.update(s).digest('hex').substring(0, 8)
  }
}

export class LinkBuilder {
  #link: LinkAst

  constructor(link: LinkAst) {
    this.#link = link
  }

  /**
   * setting note of link
   * @param label
   * @param position
   */
  noteOf(label: string, position: Position = 'right') {
    this.#link.note = {
      label,
      position,
    }
    return this
  }

  commentOf(comment: string) {
    this.#link.comment = comment
    return this
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
  packageStyle(style: ZoneType = 'Rectangle') {
    this.config.packageStyle = style
    return this
  }

  /**
   * setting direction
   * @param direction
   */
  direction(direction: DirectionType) {
    this.config.direction = direction
    return this
  }

  /**
   * 设置主题
   * @param theme
   */
  theme(theme: Theme = 'cerulean-outline') {
    this.config.theme = theme
    return this
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
      actorStyle: 'awesome',
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
  protected s: S
  protected meta: T

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

  protected buildActorStyle = (s: S) => {
    const { config } = this.meta
    s.$if(
      config!.actorStyle !== 'default',
      `skinparam actorStyle ${config!.actorStyle}`,
    )
  }

  protected buildPackageStyle = (s: S) => {
    const { config } = this.meta
    // setting direction
    s.$s(`${config!.direction.replace('->', ' to ')} direction\n`)
  }

  protected buildDirection = (s: S) => {
    const { config } = this.meta
    // setting direction
    s.$s(`${config!.direction.replace('->', ' to ')} direction\n`)
  }

  protected buildLinks =
    (linkStyle: '-->' | '->' = '-->') =>
    (s: S, { from, to, comment, note: link }: LinkAst) => {
      if (typeof link !== 'undefined') {
        s.$for(to, (s, to) => {
          const noteName = `nvlink_${from}_${to}`
          s.$s(`note "${link.label}" as ${noteName}`)
            .$s(`(${from}) --${noteName}`)
            .$s(`${noteName} --> (${to})`, s._if(comment, ` : ${comment}`))
        })
      } else {
        s.$for(to, (s, to) =>
          s.$s(`${from} ${linkStyle} ${to}`, s._if(comment, ` : ${comment}`)),
        )
      }
    }

  protected buildVlink =
    (linkStyle: '..>' | '.>' | '-->' = '..>') =>
    (s: S, { from, to, comment, note: link }: LinkAst) => {
      if (typeof link !== 'undefined') {
        s.$for(to, (s, to) => {
          const noteName = `nvlink_${from}_${to}`
          s.$s(`note "${link.label}" as ${noteName}`)
            .$s(`(${from}) .. ${noteName}`)
            .$s(`${noteName} ..> (${to})`, s._if(comment, ` : ${comment}`))
        })
      } else {
        s.$for(to, (s, to) =>
          s.$s(
            `${from} ${linkStyle} ${to}`,
            s._if(comment, ` : ${comment}`, ''),
          ),
        )
      }
    }

  protected buildNotes = (s: S, note: NoteAst) => {
    const { label, position, on } = note
    s.$s(`note ${position} of (${on})`).$s(`  ${label}`).$s('end note')
  }
  protected buildRels = (s: S, { from, to }: RelAst) =>
    s.$for(to, (s, t) => s.$s(`${from} - ${t}`))

  plantUML(img: string) {
    const jar = path.join(__dirname, '../../bin/plantuml-1.2022.8.jar')

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
