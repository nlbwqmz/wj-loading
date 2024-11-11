export interface LoadingOption {
  // 节点
  element?: string | HTMLElement
  // 立即执行
  immediate?: boolean
  // 执行时时间（毫秒）
  interval?: number
  // 移除后执行
  afterRemove?: () => void
  // 背景
  background?: string
}

export interface LoadingFunction {
  createStyle: () => HTMLStyleElement
  createLoadingElement: () => HTMLElement
}
