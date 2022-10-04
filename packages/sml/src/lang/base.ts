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

  abstract emitPuml(): string

  emitMarkdown() {
    return new S()
      .$s(`## ${this.meta.title}`)
      .$s('')
      .$s('```plantuml')
      .$s('')
      .$s(this.emitPuml())
      .$s('')
      .$s('```')
      .$s('')
      .toString()
  }

  protected buildConfig = (s: S) => {
    this.buildTheme(s)
    this.buildActorStyle(s)
    this.buildPackageStyle(s)
    this.buildDirection(s)
    this.buildTile(s)
  }

  protected buildTheme = (s: S) => {
    s.$s(`!theme ${this.meta.config!.theme}`)
  }

  protected buildTile = (s: S) => {
    s.$s(`title ${this.meta.title}`).$s('')
  }

  protected buildActorStyle = (s: S) => {
    s.$if(
      this.meta.config!.actorStyle !== 'default',
      `skinparam actorStyle ${this.meta.config!.actorStyle}`,
    )
  }

  protected buildPackageStyle = (s: S) => {
    // setting direction
    s.$s(`skinparam packageStyle ${this.meta.config!.packageStyle}`)
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
            .$s(`${noteName} --> (${to})`, s.if$(comment, ` : ${comment}`))
        })
      } else {
        s.$for(to, (s, to) =>
          s.$s(`${from} ${linkStyle} ${to}`, s.if$(comment, ` : ${comment}`)),
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
            .$s(`${noteName} ..> (${to})`, s.if$(comment, ` : ${comment}`))
        })
      } else {
        s.$for(to, (s, to) =>
          s.$s(
            `${from} ${linkStyle} ${to}`,
            s.if$(comment, ` : ${comment}`, ''),
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
      `${this.emitPuml()} | java -jar ${jar} -pipe > ${img}`,
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
