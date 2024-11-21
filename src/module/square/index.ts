import Loading, {LoadingOption} from "../../core/loading";

export interface SquareLoadingOption extends LoadingOption {
  maxSize?: number
  // 文字
  text?: string
  // 文字颜色
  fontColor?: string | number
  // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
  textVisible?: 1 | 2 | 3
}

export default class SquareLoading extends Loading {
  readonly #maxSize?: number
  // 文字
  readonly #text?: string
  // 文字颜色
  readonly #fontColor?: string | number
  // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
  readonly #textVisible?: 1 | 2 | 3

  constructor(option: SquareLoadingOption = {}) {
    super(option)
    this.#text = option.text || 'Loading...'
    this.#fontColor = option.fontColor || 'rgba(128, 128, 128, .9)'
    this.#textVisible = option.textVisible || 3
    this.#maxSize = option.maxSize
    this.addStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.afterRendered = () => {
      if (this.#textVisible === 3) {
        this.#switchTextVisible()
      }
    }
    this.finish()
  }

  #switchTextVisible() {
    const loadingText = <HTMLElement>this.element.querySelector(`.${this.id}-text`)
    if (loadingText) {
      if (loadingText.offsetWidth < loadingText.scrollWidth) {
        loadingText.style.display = 'none'; // 隐藏文字
      } else {
        loadingText.style.display = 'block'; // 显示文字
      }
    }
  }

  #createStyle() {
    const width = this.element === document.body ? window.innerWidth : this.element.offsetWidth
    const height = this.element === document.body ? window.innerHeight : this.element.offsetHeight
    let size = Math.min(width, height) / 4
    if (this.#maxSize && size > this.#maxSize) {
      size = this.#maxSize
    }
    const itemSize = size / 2
    const style = document.createElement('style')
    style.innerHTML = `
        .${this.id}-text {
          width: 100%;
          position: absolute;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          ${this.#fontColor ? `color: ${this.#fontColor};` : ''}
          top: ${height / 2 + itemSize + 10}px;
          ${this.#textVisible === 1 || this.#textVisible === 3 ? '' : 'display: none;'}
        }
        
        .${this.id} {
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        
        .${this.id} .${this.id}-item {
          width: ${itemSize}px;
          height: ${itemSize}px;
          position: absolute;
        }
        
        .${this.id} .${this.id}-item-1 {
          background-color: #FA5667;
          top: 0;
          left: 0;
          z-index: 1;
          animation: ${this.id}-item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.id} .${this.id}-item-2 {
          background-color: #7A45E5;
          top: 0;
          right: 0;
          animation: ${this.id}-item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.id} .${this.id}-item-3 {
          background-color: #1B91F7;
          bottom: 0;
          right: 0;
          z-index: 1;
          animation: ${this.id}-item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        .${this.id} .${this.id}-item-4 {
          background-color: #FAC24C;
          bottom: 0;
          left: 0;
          animation: ${this.id}-item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
        }
        
        @keyframes ${this.id}-item-1_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(0, ${itemSize}px)} 
          50% {transform: translate(${itemSize}px, ${itemSize}px)} 
          75% {transform: translate(${itemSize}px, 0)} 
        }
        
        @keyframes ${this.id}-item-2_move {
          0%, 100% {transform: translate(0, 0)}
          25% {transform: translate(-${itemSize}px, 0)}
          50% {transform: translate(-${itemSize}px, ${itemSize}px)}
          75% {transform: translate(0, ${itemSize}px)} 
        }
        
        @keyframes ${this.id}-item-3_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(0, -${itemSize}px)} 
          50% {transform: translate(-${itemSize}px, -${itemSize}px)} 
          75% {transform: translate(-${itemSize}px, 0)} 
        }
        
        @keyframes ${this.id}-item-4_move {
          0%, 100% {transform: translate(0, 0)} 
          25% {transform: translate(${itemSize}px, 0)} 
          50% {transform: translate(${itemSize}px, -${itemSize}px)} 
          75% {transform: translate(0, -${itemSize}px)} 
        }
        `
    return style
  }

  #createLoadingElement() {
    return `
        <div class="${this.id}">
              <div class="${this.id}-item ${this.id}-item-1"></div>
              <div class="${this.id}-item ${this.id}-item-2"></div>
              <div class="${this.id}-item ${this.id}-item-3"></div>
              <div class="${this.id}-item ${this.id}-item-4"></div>
            </div>
            <div class="${this.id}-text">${this.#text}</div>
        `
  }

}
