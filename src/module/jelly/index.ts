import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface JellyLoadingOption extends LoadingOption, Partial<JellyLoadingSupportChangeOption> {
}

export interface JellyLoadingSupportChangeOption {
  color: string
  shadowColor: string
  shadowOpacity: string
}

export declare type JellyLoadingType = JellyLoading;

export default class JellyLoading extends LoadingTop {
  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: JellyLoadingSupportChangeOption

  constructor(option: JellyLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<JellyLoadingSupportChangeOption>({
          color: this.getOrDefault(option.color, '#fff'),
          shadowColor: this.getOrDefault(option.shadowColor, '#000'),
          shadowOpacity: this.getOrDefault(option.shadowOpacity, '0.1')
        }, {
          set: (target: JellyLoadingSupportChangeOption, key: keyof JellyLoadingSupportChangeOption, value) => {
            if (value !== undefined && value !== null) {
              // @ts-ignore
              target[key] = value
              const styleList: (keyof JellyLoadingSupportChangeOption)[] = ['color', 'shadowColor', 'shadowOpacity']
              if (styleList.includes(key)) {
                this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
              }
            }
            return true
          }
        }
    )
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--shadow-color', this.#supportChangeObject.shadowColor)
    this.#loadingElement.style.setProperty('--shadow-opacity', this.#supportChangeObject.shadowOpacity)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<JellyLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-jelly')
    loadingElement.innerHTML = `
      <div class="wj-loading-animation-jelly-box"></div>
      <div class="wj-loading-animation-jelly-shadow"></div>
    `
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'JellyLoading'
  }

}
