import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import {FixedLengthArray} from "../../core/types";
import './index.css'

export interface CmSpinnerLoadingOption extends LoadingOption, Partial<CmSpinnerLoadingSupportChangeOption> {}

export interface CmSpinnerLoadingSupportChangeOption {
  color: FixedLengthArray<string, 3>;
  size: string;
}

export declare type CmSpinnerLoadingType = CmSpinnerLoading;

export default class CmSpinnerLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: CmSpinnerLoadingSupportChangeOption

  constructor(option: CmSpinnerLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<CmSpinnerLoadingSupportChangeOption>({
      color: option.color && option.color.length >= 3 ? option.color : ['#F15E41', '#BAD375', '#26A9E0'],
      size: this.getOrDefault(option.size, '100px')
    }, {
      set: (target: CmSpinnerLoadingSupportChangeOption, key: keyof CmSpinnerLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof CmSpinnerLoadingSupportChangeOption)[] = ['color', 'size']
          if (styleList.includes(key)) {
            if (key === 'color') {
              if (value && value.length >= 3) {
                this.#loadingElement.style.setProperty('--color-0', value[0])
                this.#loadingElement.style.setProperty('--color-1', value[1])
                this.#loadingElement.style.setProperty('--color-2', value[2])
              }
            } else {
              this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
            }
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
    this.#loadingElement.style.setProperty('--color-0', this.#supportChangeObject.color[0])
    this.#loadingElement.style.setProperty('--color-1', this.#supportChangeObject.color[1])
    this.#loadingElement.style.setProperty('--color-2', this.#supportChangeObject.color[2])
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<CmSpinnerLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-cm-spinner')
    return loadingElement
  }
  get [Symbol.toStringTag](){
    return 'CmSpinnerLoading'
  }
}
