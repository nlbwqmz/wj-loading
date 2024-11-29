export interface LoadingOption {
  // 节点
  element?: string | Element | null
  // 立即执行
  immediate?: boolean
  // 执行时时间（毫秒）
  interval?: number
  // 移除后执行
  afterRemove?: () => void
  // 背景
  background?: string
  zIndex?: number
  // 延迟remove 解决闪烁问题
  delayRemove?: number
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
  // 已渲染
  protected rendered: boolean
  protected readonly element: Element
  // 立即执行
  protected readonly immediate?: boolean
  // 执行时时间（毫秒）
  protected readonly interval?: number
  // 移除后执行
  protected readonly afterRemove?: () => void
  // 背景
  protected readonly background: string
  protected readonly style: HTMLStyleElement
  #childrenStyle?: HTMLStyleElement
  #containerFlexCenter?: boolean
  protected readonly container: Element
  protected readonly delayRemove?: number
  // 渲染成功后执行
  protected afterRendered?: () => void
  // 元素宽或高改变后触发
  protected handleElementChange?: () => void
  protected zIndex?: number
  #currentOffsetHeight?: number
  #currentOffsetWidth?: number
  #observer?: ResizeObserver

  constructor(option: LoadingOption = {}) {
    this.id = `wj-loading-${generateId()}`
    this.rendered = false
    this.element = this.#selectElement(option.element)
    this.immediate = option.immediate
    this.interval = option.interval
    this.delayRemove = option.delayRemove
    this.afterRemove = option.afterRemove
    this.background = option.background || 'rgba(0, 0, 0, 0.2)'
    this.zIndex = this.zIndex || 2000
    this.style = document.createElement('style')
    this.container = document.createElement('div')
  }

  #createStyleInnerHTML = (height: number, width: number) => {
    let styleInnerHTML = `
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
        width: ${width}px;
        height: ${height}px;
        left: ${this.element.scrollLeft}px;
        top: ${this.element.scrollTop}px;
      }
    `
    if (this.#containerFlexCenter === true) {
      styleInnerHTML += `
      .${this.id}-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `
    }
    return styleInnerHTML
  }

  /**
   * 初始化容器样式
   */
  #initContainerStyle() {
    const boundingClientRect = this.element.getBoundingClientRect();
    const width = this.element === document.body ? window.innerWidth : boundingClientRect.width
    const height = this.element === document.body ? window.innerHeight : boundingClientRect.height
    this.#currentOffsetWidth = width
    this.#currentOffsetHeight = height
    this.style.innerHTML = this.#createStyleInnerHTML(height, width)
  }

  #listen() {
    this.#observer = new ResizeObserver(() => {
      const boundingClientRect = this.element.getBoundingClientRect();
      const width = this.element === document.body ? window.innerWidth : boundingClientRect.width
      const height = this.element === document.body ? window.innerHeight : boundingClientRect.height
      if (this.#currentOffsetHeight !== height || this.#currentOffsetWidth !== width) {
        this.#currentOffsetWidth = width
        this.#currentOffsetHeight = height
        this.style.innerHTML = this.#createStyleInnerHTML(height, width)
        this.handleElementChange && this.handleElementChange()
      }
    })
    this.#observer.observe(this.element)
  }

  protected setContainerFlexCenter(flag: boolean = true) {
    this.#containerFlexCenter = flag
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
  #selectElement(element?: string | Element | null) {
    if (element) {
      if (typeof (element) === 'string') {
        const ele: Element | null = document.querySelector(element);
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
  protected setChildrenStyle(style: HTMLStyleElement) {
    if (this.#childrenStyle) {
      this.#childrenStyle.innerHTML = style.innerHTML
    } else {
      this.#childrenStyle = style
    }
  }

  /**
   * 添加节点
   */
  protected addElement(dom: Element | string) {
    if (typeof (dom) === 'string') {
      this.container.innerHTML += dom
    } else {
      this.container.appendChild(dom)
    }
  }

  protected finish() {
    this.#initContainerStyle()
    this.#initContainerElement()
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

    if (!['relative', 'absolute', 'fixed'].includes(window.getComputedStyle(this.element).position)) {
      this.element.classList.add(`${this.id}-relative`)
    }
    this.element.classList.add(`${this.id}-lock`)
    document.getElementsByTagName('head')[0].appendChild(this.style)
    if (this.#childrenStyle) {
      document.getElementsByTagName('head')[0].appendChild(this.#childrenStyle)
    }
    this.element.appendChild(this.container)
    this.#listen()
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
  remove(delayRemove?: number) {
    if (!this.rendered) {
      return
    }
    const r = () => {
      this.#observer && this.#observer.disconnect()
      this.container && this.container.remove()
      this.style && this.style.remove()
      this.#childrenStyle && this.#childrenStyle.remove()
      if (this.element.classList.contains(`${this.id}-relative`)) {
        this.element.classList.remove(`${this.id}-relative`)
      }
      this.element.classList.remove(`${this.id}-lock`)
      this.rendered = false
      this.afterRemove && this.afterRemove()
    }
    const delay = delayRemove || this.delayRemove || 0
    if (delay && delay > 0) {
      setTimeout(() => {
        r()
      }, delay)
    } else {
      r()
    }

  }
}
