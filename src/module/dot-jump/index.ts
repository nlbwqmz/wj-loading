import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import {FixedLengthArray} from "../../core/types";
import './index.css'

export interface DotJumpOption extends LoadingOption, Partial<DotJumpSupportChangeOption> {
}

export interface DotJumpSupportChangeOption {
  color: FixedLengthArray<string, 2>
}

export declare type DotJumpLoadingType = DotJumpLoading;


export default class DotJumpLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: DotJumpSupportChangeOption

  constructor(option: DotJumpOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<DotJumpSupportChangeOption>({
      color: option.color && option.color.length >= 2 ? option.color : ['#000', '#000']
    }, {
      set: (target: DotJumpSupportChangeOption, key: keyof DotJumpSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof DotJumpSupportChangeOption)[] = ['color']
          if (styleList.includes(key)) {
            if (key === 'color') {
              if (value && value.length >= 2) {
                this.#loadingElement.style.setProperty('--color-0', value[0])
                this.#loadingElement.style.setProperty('--color-1', value[1])
              }
            }

          }
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
    this.#loadingElement.style.setProperty('--color-0', this.#supportChangeObject.color[0])
    this.#loadingElement.style.setProperty('--color-1', this.#supportChangeObject.color[1])
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<DotJumpSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-dot-jump')
    loadingElement.innerHTML = '<div></div><div></div><div></div><div></div>'
    return loadingElement
  }

}
