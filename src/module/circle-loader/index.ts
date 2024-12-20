import './index.css'
import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";

export interface CircleLoaderLoadingOption extends LoadingOption, Partial<CircleLoaderLoadingSupportChangeOption> {}

export interface CircleLoaderLoadingSupportChangeOption {
  color: string;
}

export type CircleLoaderLoadingType = CircleLoaderLoading

export default class CircleLoaderLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: CircleLoaderLoadingSupportChangeOption

  constructor(option: CircleLoaderLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<CircleLoaderLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#F44336')
    }, {
      set: (target: CircleLoaderLoadingSupportChangeOption, key: keyof CircleLoaderLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof CircleLoaderLoadingSupportChangeOption)[] = ['color']
          if (styleList.includes(key)) {
            this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
          }
        }
        return true
      }
    })
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<CircleLoaderLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-circle-loader')
    loadingElement.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'
    return loadingElement
  }
  get [Symbol.toStringTag](){
    return 'CircleLoaderLoading'
  }
}
