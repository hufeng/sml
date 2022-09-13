// ~~~~~~~~~~`basic type~~~~~~~~~~~~~`
export type PackageStyle =
  | 'Node'
  | 'Rectangle'
  | 'Folder'
  | 'Frame'
  | 'Cloud'
  | 'DataBase'
type ActorStyleType = 'default' | 'awesome' | 'Hollow'
type DirectionType = 'left->right' | 'top->down'

// ~~~~~~ composite type ~~~~~~~~~~~~~~~
export type ConfigType = {
  actorStyle: ActorStyleType
  direction: DirectionType
  packageStyle: PackageStyle
}

// ~~~~~~~~~~ builder ~~~~~~~~~~~~~~~~~~~~~~
class ConfigBuilder {
  private config: ConfigType

  constructor(config: ConfigType) {
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
}

// ~~~~~~~~~~ lang base ~~~~~~~~~~~~~~~~
export class Lang {
  protected config: ConfigType
  protected title: string

  constructor(title: string) {
    this.title = title
    this.config = {
      actorStyle: 'default',
      direction: 'left->right',
      packageStyle: 'Rectangle',
    }
  }

  get configuration() {
    return new ConfigBuilder(this.config)
  }
}
