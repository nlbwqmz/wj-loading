import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import {FixedLengthArray} from "../../core/types";
import './index.css'

export interface TripleSpinnerLoadingOption extends LoadingOption, Partial<TripleSpinnerLoadingSupportChangeOption> {
}

export interface TripleSpinnerLoadingSupportChangeOption {
  color: FixedLengthArray<string, 3>
  size: string;
}

export declare type TripleSpinnerLoadingType = TripleSpinnerLoading;

export default class TripleSpinnerLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: TripleSpinnerLoadingSupportChangeOption

  constructor(option: TripleSpinnerLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<TripleSpinnerLoadingSupportChangeOption>({
          color: option.color && option.color.length >= 3 ? option.color : ['#FF5722', '#FF9800', '#FFC107'],
          size: this.getOrDefault(option.size, '100px')
        }, {
          set: (target: TripleSpinnerLoadingSupportChangeOption, key: keyof TripleSpinnerLoadingSupportChangeOption, value) => {
            if (value !== undefined && value !== null) {
              // @ts-ignore
              target[key] = value
              const styleList: (keyof TripleSpinnerLoadingSupportChangeOption)[] = ['size']
              if (key === 'color') {
                if (value && value >= 3) {
                  this.#loadingElement.style.setProperty('--color-0', value[0])
                  this.#loadingElement.style.setProperty('--color-1', value[1])
                  this.#loadingElement.style.setProperty('--color-2', value[2])
                }
              } else if (styleList.includes(key)) {
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
    this.#loadingElement.style.setProperty('--color-0', this.#supportChangeObject.color[0])
    this.#loadingElement.style.setProperty('--color-1', this.#supportChangeObject.color[1])
    this.#loadingElement.style.setProperty('--color-2', this.#supportChangeObject.color[2])
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TripleSpinnerLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-triple-spinner')
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'TripleSpinnerLoading'
  }

}
