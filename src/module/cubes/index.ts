import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface CubesLoadingOption extends LoadingOption, Partial<CubesLoadingSupportChangeOption> {
}

export interface CubesLoadingSupportChangeOption {
  color: string;
  size: string;
}

export declare type CubesLoadingType = CubesLoading;

export default class CubesLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: CubesLoadingSupportChangeOption

  constructor(option: CubesLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<CubesLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#333'),
      size: this.getOrDefault(option.size, '20px')
    }, {
      set: (target: CubesLoadingSupportChangeOption, key: keyof CubesLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          const styleList: (keyof CubesLoadingSupportChangeOption)[] = ['color', 'size']
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
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<CubesLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-cubes')
    loadingElement.innerHTML = `
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube1"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube2"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube3"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube4"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube5"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube6"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube7"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube8"></div>
      <div class="wj-loading-animation-cubes-sk-cube wj-loading-animation-cubes-sk-cube9"></div>
    `
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'CubesLoading'
  }

}
