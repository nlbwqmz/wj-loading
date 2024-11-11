import LoadingOption from "../interface/interface";

export interface SquareLoadingOption extends LoadingOption {
  // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
  textVisible?: 1 | 2 | 3
  maxSize?: number
}

export default class SquareLoading {
  #rendered: boolean
  readonly #element: HTMLElement
  // 立即执行
  readonly #immediate?: boolean
  // 执行时时间（毫秒）
  readonly #interval?: number
  // 移除后执行
  readonly #afterRemove?: () => void
  // text
  readonly #text: string
  // 文字颜色
  readonly #color: string | number
  // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
  readonly #textVisible: 1 | 2 | 3
  #style?: HTMLStyleElement
  #loadingElement?: HTMLElement
  readonly #loadingClass: string
  // 背景
  readonly #background: string
  readonly #maxSize?: number

  constructor(option: SquareLoadingOption) {
    this.#rendered = false
    this.#element = this.#selectElement(option)
    this.#immediate = option.immediate
    this.#interval = option.interval
    this.#afterRemove = option.afterRemove
    this.#text = option.text || 'Loading...'
    this.#color = option.color || 'rgba(128, 128, 128, .9)'
    this.#textVisible = option.textVisible || 3
    this.#background = option.background || 'none'
    this.#loadingClass = `wj-loading-${new Date().getTime()}`
    this.#maxSize = option.maxSize
    if (this.#immediate) {
      this.loading()
    }
  }

  #selectElement(option: SquareLoadingOption) {
    if (option.element) {
      if (typeof (option.element) === 'string') {
        const ele: HTMLElement | null = document.querySelector(option.element);
        if (!ele) {
          throw new Error(`未找到当前节点：${option.element}`)
        }
        return ele
      } else {
        return option.element
      }
    } else {
      return document.body
    }
  }

  #switchTextVisible() {
    const loadingText = <HTMLElement>this.#element.querySelector(`.${this.#loadingClass}-text`)
    if (loadingText) {
      if (loadingText.offsetWidth < loadingText.scrollWidth) {
        loadingText.style.display = 'none'; // 隐藏文字
      } else {
        loadingText.style.display = 'block'; // 显示文字
      }
    }
  }

  #createStyle() {
    const width = this.#element === document.body ? window.innerWidth : this.#element.offsetWidth
    const height = this.#element === document.body ? window.innerHeight : this.#element.offsetHeight
    let size = Math.min(this.#element.offsetWidth, this.#element.offsetHeight) / 4
    if (this.#maxSize && size > this.#maxSize) {
      size = this.#maxSize
    }
    const itemSize = size / 2
    const style = document.createElement('style')
    style.innerHTML = `
        
        .${this.#loadingClass}-relative {
            position: relative;
        }
        
        .${this.#loadingClass}-lock {
          overflow: hidden !important;
        }
        
        .${this.#loadingClass}-container {
          background: ${this.#background};
          position: absolute;
          width: ${width}px;
          height: ${height}px;
          left: ${this.#element.scrollLeft}px;
          top: ${this.#element.scrollTop}px;
        }
        
        .${this.#loadingClass}-text {
          width: ${width}px;
          position: absolute;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          ${this.#color ? `color: ${this.#color};` : ''}
          top: ${height / 2 + itemSize + 10}px;
          ${this.#textVisible === 1 || this.#textVisible === 3 ? '' : 'display: none;'}
        }
        
        .${this.#loadingClass} {
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        
        .${this.#loadingClass} .${this.#loadingClass}-item {
          width: ${itemSize}px;
          height: ${itemSize}px;
          position: absolute;
        }
        
        .${this.#loadingClass} .${this.#loadingClass}-item-1 {
          background-color: #FA5667;
          top: 0;
          left: 0;
          z-index: 1;
          animation: ${this.#loadingClass}-item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.#loadingClass} .${this.#loadingClass}-item-2 {
          background-color: #7A45E5;
          top: 0;
          right: 0;
          animation: ${this.#loadingClass}-item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.#loadingClass} .${this.#loadingClass}-item-3 {
          background-color: #1B91F7;
          bottom: 0;
          right: 0;
          z-index: 1;
          animation: ${this.#loadingClass}-item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.#loadingClass} .${this.#loadingClass}-item-4 {
          background-color: #FAC24C;
          bottom: 0;
          left: 0;
          animation: ${this.#loadingClass}-item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        @keyframes ${this.#loadingClass}-item-1_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(0, ${itemSize}px)} 
          50% {transform: translate(${itemSize}px, ${itemSize}px)} 
          75% {transform: translate(${itemSize}px, 0)} 
        }
        
        @keyframes ${this.#loadingClass}-item-2_move {
          0%, 100% {transform: translate(0, 0)}
          25% {transform: translate(-${itemSize}px, 0)}
          50% {transform: translate(-${itemSize}px, ${itemSize}px)}
          75% {transform: translate(0, ${itemSize}px)} 
        }
        
        @keyframes ${this.#loadingClass}-item-3_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(0, -${itemSize}px)} 
          50% {transform: translate(-${itemSize}px, -${itemSize}px)} 
          75% {transform: translate(-${itemSize}px, 0)} 
        }
        
        @keyframes ${this.#loadingClass}-item-4_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(${itemSize}px, 0)} 
          50% {transform: translate(${itemSize}px, -${itemSize}px)} 
          75% {transform: translate(0, -${itemSize}px)} 
        }
        `
    return style
  }

  #createLoadingElement() {
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="${this.#loadingClass}-container">
            <div class="${this.#loadingClass}">
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-1"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-2"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-3"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-4"></div>
            </div>
            <div class="${this.#loadingClass}-text">${this.#text}</div>
        </div>
        `
    return div
  }

  #afterRender() {
    if (this.#textVisible === 3) {
      this.#switchTextVisible()
    }
  }

  remove() {
    if (!this.#rendered) {
      return
    }
    if (this.#loadingElement) {
      this.#loadingElement.remove()
    }
    if (this.#style) {
      this.#style.remove()
    }
    if (this.#element.classList.contains(`${this.#loadingClass}-relative`)) {
      this.#element.classList.remove(`${this.#loadingClass}-relative`)
    }
    this.#element.classList.remove(`${this.#loadingClass}-lock`)
    this.#rendered = false
    this.#afterRemove && this.#afterRemove()
  }

  loading() {
    if (this.#rendered) {
      return
    }
    if (!['relative', 'absolute', 'fixed'].includes(this.#element.style.position)) {
      this.#element.classList.add(`${this.#loadingClass}-relative`)
    }
    console.log(this.#element.offsetWidth)
    this.#element.classList.add(`${this.#loadingClass}-lock`)
    this.#style = this.#createStyle();
    document.getElementsByTagName('head')[0].appendChild(this.#style)
    this.#loadingElement = this.#createLoadingElement();
    this.#element.appendChild(this.#loadingElement)
    this.#rendered = true
    this.#afterRender()
    if (this.#interval && this.#interval > 0) {
      setTimeout(() => {
        this.remove()
      }, this.#interval)
    }
  }

}
