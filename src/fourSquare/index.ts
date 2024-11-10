import LoadingOption from "../interface/interface";

export interface FourSquareLoadingOption extends LoadingOption {
    // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
    textVisible?: 1 | 2 | 3
}

export default class FourSquareLoading {
    #element: HTMLElement
    // 立即执行
    readonly #immediate?: boolean
    // 执行时时间（毫秒）
    readonly #interval?: number
    // 移除后执行
    readonly #afterRemove?: () => void
    // text
    #text: string | undefined
    // 文字颜色
    #textColor: string | number | undefined
    // 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示
    #textVisible?: 1 | 2 | 3
    #style: HTMLStyleElement | undefined
    #loadingElement: HTMLElement | undefined
    #loadingClass: string | undefined

    constructor(option: FourSquareLoadingOption) {
        this.#element = this.#selectElement(option)
        this.#immediate = option.immediate
        this.#interval = option.interval
        this.#afterRemove = option.afterRemove
        this.#text = option.text
        this.#textColor = option.textColor
        this.#textVisible = option.textVisible
        if(this.#immediate) {
            this.loading()
        }
    }

    #selectElement(option: FourSquareLoadingOption) {
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

    #createStyle() {
        const size = Math.min(this.#element.clientWidth, this.#element.clientHeight) / 3
        const itemSize = size / 2
        const style = document.createElement('style')
        style.innerHTML = `
        
        .wj-loading-relative {
            position: relative
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
            <div class="${this.#loadingClass}">
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-1"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-2"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-3"></div>
              <div class="${this.#loadingClass}-item ${this.#loadingClass}-item-4"></div>
            </div>
        `
        return div
    }

    #afterRender(){

    }

    remove() {
        if(this.#loadingElement){
            this.#loadingElement.remove()
        }
        if(this.#style){
            this.#style.remove()
        }
        if(this.#element.classList.contains('wj-loading-relative')){
            this.#element.classList.remove('wj-loading-relative')
        }
        this.#afterRemove && this.#afterRemove()
    }

    loading() {
        if(!['relative', 'absolute', 'fixed'].includes(this.#element.style.position)){
            this.#element.classList.add('wj-loading-relative')
        }
        this.#loadingClass = `${this.#loadingClass}-${new Date().getTime()}`
        this.#style = this.#createStyle();
        document.getElementsByTagName('head')[0].appendChild(this.#style)
        this.#loadingElement = this.#createLoadingElement();
        this.#element.appendChild(this.#loadingElement)
        this.#afterRender()
        if(this.#interval && this.#interval > 0){
            setTimeout(() => {
                this.remove()
            }, this.#interval)
        }
    }

}
