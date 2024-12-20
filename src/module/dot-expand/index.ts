import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface DotExpandLoadingOption extends LoadingOption, Partial<DotExpandLoadingSupportChangeOption> {}

export interface DotExpandLoadingSupportChangeOption {
  color: string;
}

export declare type DotExpandLoadingType = DotExpandLoading;

export default class DotExpandLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: DotExpandLoadingSupportChangeOption

  constructor(option: DotExpandLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<DotExpandLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#000')
    }, {
      set: (target: DotExpandLoadingSupportChangeOption, key: keyof DotExpandLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof DotExpandLoadingSupportChangeOption)[] = ['color']
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

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<DotExpandLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-dot-expand')
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'DotExpandLoading'
  }

}
