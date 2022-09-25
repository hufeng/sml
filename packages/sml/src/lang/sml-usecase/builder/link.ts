import { LinkAst, Position } from '../../types'

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
    this.#link.link = {
      label,
      position,
    }
  }
}
