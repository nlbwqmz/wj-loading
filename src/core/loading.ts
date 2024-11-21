export interface LoadingOption {
  // 节点
  element?: string | HTMLElement | null
  // 立即执行
  immediate?: boolean
  // 执行时时间（毫秒）
  interval?: number
  // 移除后执行
  afterRemove?: () => void
  // 背景
  background?: string
  zIndex?: number
}

const generateId = (length: number = 8) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
}

export default class Loading {
  protected readonly id: string
  protected rendered: boolean
  protected readonly element: HTMLElement
  // 立即执行
  protected readonly immediate?: boolean
  // 执行时时间（毫秒）
  protected readonly interval?: number
  // 移除后执行
  protected readonly afterRemove?: () => void
  // 背景
  protected readonly background: string
  protected readonly style: HTMLStyleElement
  protected readonly container: HTMLElement
  // 渲染成功后执行
  protected afterRendered?: () => void
  protected zIndex?: number

  constructor(option: LoadingOption = {}) {
    this.id = `wj-loading-${generateId()}`
    this.rendered = false
    this.element = this.#selectElement(option.element)
    this.immediate = option.immediate
    this.interval = option.interval
    this.afterRemove = option.afterRemove
    this.background = option.background || 'rgba(0, 0, 0, 0.2)'
    this.zIndex = this.zIndex || 2000
    this.style = document.createElement('style')
    this.container = document.createElement('div')
    this.#initContainerStyle()
    this.#initContainerElement()
  }

  /**
   * 初始化容器样式
   */
  #initContainerStyle() {
    // const width = this.element === document.body ? window.innerWidth : this.element.offsetWidth
    const height = this.element === document.body ? window.innerHeight : this.element.offsetHeight
    this.style.innerHTML = `
      .${this.id}-relative {
        position: relative;
      }
      .${this.id}-lock {
        overflow: hidden !important;
      }
      .${this.id}-container {
        user-select: none !important;
        z-index: ${this.zIndex};
        background: ${this.background};
        position: absolute;
        width: 100%;
        height: ${height}px;
        left: ${this.element.scrollLeft}px;
        top: ${this.element.scrollTop}px;
      }
    `
  }

  protected setContainerFlexCenter() {
    this.style.innerHTML += `
      .${this.id}-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `
  }

  /**
   * 初始化容器元素
   */
  #initContainerElement() {
    this.container.classList.add(`${this.id}-container`)
  }

  /**
   * 查到目标元素
   */
  #selectElement(element?: string | HTMLElement | null) {
    if (element) {
      if (typeof (element) === 'string') {
        const ele: HTMLElement | null = document.querySelector(element);
        if (!ele) {
          throw new Error(`未找到当前节点：${element}`)
        }
        return ele
      } else {
        return element
      }
    } else {
      return document.body
    }
  }

  /**
   * 添加样式
   */
  protected addStyle(style: HTMLStyleElement) {
    this.style.appendChild(style)
  }

  /**
   * 添加节点
   */
  protected addElement(dom: HTMLElement | string) {
    if (typeof (dom) === 'string') {
      this.container.innerHTML += dom
    } else {
      this.container.appendChild(dom)
    }
  }

  protected finish() {
    if (this.immediate) {
      this.loading(this.interval)
    }
  }

  /**
   * 执行loading
   */
  loading(interval?: number) {
    if (this.rendered) {
      return
    }
    if (!['relative', 'absolute', 'fixed'].includes(this.element.style.position)) {
      this.element.classList.add(`${this.id}-relative`)
    }
    this.element.classList.add(`${this.id}-lock`)
    document.getElementsByTagName('head')[0].appendChild(this.style)
    this.element.appendChild(this.container)
    this.rendered = true
    if (interval && interval > 0) {
      setTimeout(() => {
        this.remove()
      }, interval)
    }
    this.afterRendered && this.afterRendered()
  }

  /**
   * 移除
   */
  remove() {
    if (!this.rendered) {
      return
    }
    if (this.container) {
      this.container.remove()
    }
    if (this.style) {
      this.style.remove()
    }
    if (this.element.classList.contains(`${this.id}-relative`)) {
      this.element.classList.remove(`${this.id}-relative`)
    }
    this.element.classList.remove(`${this.id}-lock`)
    this.rendered = false
    this.afterRemove && this.afterRemove()
  }
}
