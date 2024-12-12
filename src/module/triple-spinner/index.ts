import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import {FixedLengthArray} from "../../core/types";

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

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TripleSpinnerLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
      .${this.id} {
        display: block;
        position: relative;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid var(--color-0);
        -webkit-animation: ${this.id}-spin 2s linear infinite;
        animation: ${this.id}-spin 2s linear infinite;
      }
      
      .${this.id}::before,
      .${this.id}::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        border: 4px solid transparent;
      }
      .${this.id}::before {
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-top-color: var(--color-1);
        -webkit-animation: ${this.id}-spin 3s linear infinite;
        animation: ${this.id}-spin 3.5s linear infinite;
      }
      .${this.id}::after {
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-top-color: var(--color-2);
        -webkit-animation: ${this.id}-spin 1.5s linear infinite;
        animation: ${this.id}-spin 1.75s linear infinite;
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

}
