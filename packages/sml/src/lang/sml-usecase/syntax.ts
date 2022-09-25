import { Lang } from '../base'
import { UseCaseDiagramAst, ZoneStyle } from '../types'
import { ActorBuilder } from './builder/actor'
import { UsecaseBuilder } from './builder/usecase'
import { ZoneBuilder } from './builder/zone'

// ~~~~~~~~~ define usecase lang modeling ~~~~~~~~~~~~~~~
export class SmlUseCaseLang extends Lang<UseCaseDiagramAst> {
  constructor(meta: UseCaseDiagramAst) {
    super(meta)
  }

  /**
   * 设置活动者元素
   * @param label
   * @returns
   */
  actor(label: string) {
    return new ActorBuilder(this.meta, label)
  }

  /**
   * 设置用例元素
   * @param label
   * @returns
   */
  usecase(label: string) {
    return new UsecaseBuilder(this.meta, label)
  }

  /**
   * 设置包容器
   * @param label
   * @param type
   * @returns
   */
  zone(label: string, type: ZoneStyle = 'Rectangle') {
    return new ZoneBuilder(this.meta, label, type)
  }
}
