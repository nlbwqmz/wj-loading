import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";

export interface BounceLoadingOption extends LoadingOption, Partial<BounceLoadingSupportChangeOption> {
}

export interface BounceLoadingSupportChangeOption {
  color: string;
  size: string;
}

export type BounceLoadingType = BounceLoading

export default class BounceLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: BounceLoadingSupportChangeOption

  constructor(option: BounceLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<BounceLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#333'),
      size: this.getOrDefault(option.size, '20px')
    }, {
      set: (target: BounceLoadingSupportChangeOption, key: keyof BounceLoadingSupportChangeOption, value) => {
        target[key] = value
        const styleList: (keyof BounceLoadingSupportChangeOption)[] = ['color', 'size']
        if (styleList.includes(key)) {
          this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
        }
        return true
      }
    })
    this.#loadingElement = this.#createLoadingElement();
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.setChildrenStyle(this.#createStyle())
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<BounceLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
      .${this.id}-bounce {
       text-align: center;
      }
      .${this.id}-bounce>div {
       width: var(--size);
       height: var(--size);
       background-color: var(--color);
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
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(`${this.id}-bounce`)
    loadingElement.innerHTML = `<div class="${this.id}-bounce1"></div><div class="${this.id}-bounce2"></div><div class="${this.id}-bounce3"></div>`
    return loadingElement
  }
}
