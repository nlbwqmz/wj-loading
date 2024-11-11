import {LoadingOption} from "../interface/interface";
import Loading from "../loading";

export interface BounceLoadingOption extends LoadingOption {
  color?: string | number;
  size?: string;
}


export default class BounceLoading extends Loading {

  readonly #color: string | number
  readonly #size: string

  constructor(option: BounceLoadingOption) {
    super(option)
    this.#color = option.color || '#333'
    this.#size = option.size || '20px'
    this.setContainerCenter()
    this.addStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    if (this.immediate) {
      this.loading()
    }
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
    const style = document.createElement('style')
    style.innerHTML = `
      .${this.id}-bounce {
       text-align: center;
      }
      
      .${this.id}-bounce>div {
       width: ${this.#size};
       height: ${this.#size};
       background-color: ${this.#color};
       border-radius: 100%;
       display: inline-block;
       animation: ${this.id}-sk-bouncedelay 1.4s infinite ease-in-out both;
      }
      
      .${this.id}-bounce .${this.id}-bounce1 {
       animation-delay: -0.32s;
      }
      
      .${this.id}-bounce .${this.id}-bounce2 {
       animation-delay: -0.16s;
      }
      
      @keyframes ${this.id}-sk-bouncedelay {
       0%,
       80%,
       100% {
        transform: scale(0);
       }
       40% {
        transform: scale(1.0);
       }
      }
        `
    return style
  }

  #createLoadingElement() {
    return `
        <div class="${this.id}-bounce">
          <div class="${this.id}-bounce1"></div>
          <div class="${this.id}-bounce2"></div>
          <div class="${this.id}-bounce3"></div>
        </div>
        `
  }

}
