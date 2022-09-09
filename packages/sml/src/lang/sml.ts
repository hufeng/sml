export class Lang {
  protected title: string
  protected file: string

  constructor(title: string) {
    this.title = title
    this.file = ''
  }

  protected setFile(file: string) {
    this.file = file
    return this
  }
}
