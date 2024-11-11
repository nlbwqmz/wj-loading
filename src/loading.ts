import {LoadingOption} from "./interface/interface";

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
  protected readonly loadingElement: HTMLElement
  // 渲染成功后执行
  protected afterRendered?: () => void

  constructor(option: LoadingOption) {
    this.id = `wj-loading-${new Date().getTime()}`
    this.rendered = false
    this.element = this.#selectElement(option.element)
    this.immediate = option.immediate
    this.interval = option.interval
    this.afterRemove = option.afterRemove
    this.background = option.background || 'none'
    this.style = document.createElement('style')
    this.loadingElement = document.createElement('div')
    this.#initContainerStyle()
    this.#initContainerElement()
  }

  /**
   * 初始化容器样式
   */
  #initContainerStyle() {
    const width = this.element === document.body ? window.innerWidth : this.element.offsetWidth
    const height = this.element === document.body ? window.innerHeight : this.element.offsetHeight
    this.style.innerHTML = `
      .${this.id}-relative {
        position: relative;
      }
      
      .${this.id}-lock {
          overflow: hidden !important;
      }
      
      .${this.id}-container {
        background: ${this.background};
        position: absolute;
        width: ${width}px;
        height: ${height}px;
        left: ${this.element.scrollLeft}px;
        top: ${this.element.scrollTop}px;
      }
    `
  }

  protected setContainerCenter() {
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
    this.loadingElement.classList.add(`${this.id}-container`)
  }

  /**
   * 查到目标元素
   */
  #selectElement(element?: string | HTMLElement) {
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
      this.loadingElement.innerHTML += dom
    } else {
      this.loadingElement.appendChild(dom)
    }
  }

  /**
   * 执行loading
   */
  loading() {
    if (this.rendered) {
      return
    }
    if (!['relative', 'absolute', 'fixed'].includes(this.element.style.position)) {
      this.element.classList.add(`${this.id}-relative`)
    }
    this.element.classList.add(`${this.id}-lock`)
    document.getElementsByTagName('head')[0].appendChild(this.style)
    this.element.appendChild(this.loadingElement)
    this.rendered = true
    this.afterRendered && this.afterRendered()
    if (this.interval && this.interval > 0) {
      setTimeout(() => {
        this.remove()
      }, this.interval)
    }
  }

  /**
   * 移除
   */
  remove() {
    if (!this.rendered) {
      return
    }
    if (this.loadingElement) {
      this.loadingElement.remove()
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