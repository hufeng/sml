import * as lang from './index'
import { Emitter } from './lang/base'

// declare global value
declare global {
  var sml: typeof lang
  var __emitters__: Array<{ emitter: Emitter<Sml.BaseAst>; ast: Sml.BaseAst }>
}
