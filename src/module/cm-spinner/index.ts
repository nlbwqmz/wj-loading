import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import {FixedLengthArray} from "../../core/types";

export interface CmSpinnerLoadingOption extends LoadingOption, Partial<CmSpinnerLoadingSupportChangeOption> {
}

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
    this.setChildrenStyle(this.#createStyle())
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

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
          .${this.id} {
            height: var(--size);
            width: var(--size);
            border: 3px solid transparent;
            border-radius: 50%;
            border-top: 4px solid var(--color-0);
            -webkit-animation: ${this.id}-spin 4s linear infinite;
            animation: ${this.id}-spin 4s linear infinite;
            position: relative;
          }
          
          .${this.id}::before,
          .${this.id}::after {
            content: "";
            position: absolute;
            top: 6px;
            bottom: 6px;
            left: 6px;
            right: 6px;
            border-radius: 50%;
            border: 4px solid transparent;
          }
          
          .${this.id}::before {
            border-top-color: var(--color-1);
            -webkit-animation: 3s ${this.id}-spin linear infinite;
            animation: 3s ${this.id}-spin linear infinite;
          }
          
          .${this.id}::after {
            border-top-color: var(--color-2);
            -webkit-animation: ${this.id}-spin 1.5s linear infinite;
            animation: ${this.id}-spin 1.5s linear infinite;
          }
          
          -webkit-@keyframes ${this.id}-spin {
            -webkit-from {
              -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            -webkit-to {
              -webkit-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          @-webkit-keyframes ${this.id}-spin {
            from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          @keyframes ${this.id}-spin {
            from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          -webkit-@keyframes ${this.id}-spin {
            -webkit-from {
              -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            -webkit-to {
              -webkit-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          @-webkit-keyframes ${this.id}-spin {
            from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          @keyframes ${this.id}-spin {
            from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    return loadingElement
  }
  get [Symbol.toStringTag](){
    return 'CmSpinnerLoading'
  }
}
