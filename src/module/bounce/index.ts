import './index.css'
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

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(`wj-loading-animation-bounce`)
    loadingElement.innerHTML = `<div class="wj-loading-animation-bounce1"></div><div class="wj-loading-animation-bounce2"></div><div class="wj-loading-animation-bounce3"></div>`
    return loadingElement
  }
  get [Symbol.toStringTag](){
    return 'BounceLoading'
  }
}
