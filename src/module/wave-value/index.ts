import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface WaveValueLoadingOption extends LoadingOption, Partial<WaveValueLoadingSupportChangeOption> {
}

export interface WaveValueLoadingSupportChangeOption {
  color: string;
  size: number;
  borderSize: string;
  paddingSize: string;
  value: number;
  fontSize: string;
  fontColor: string;
  fontWeight: string;
}

export declare type WaveValueLoadingType = WaveValueLoading;

export default class WaveValueLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: WaveValueLoadingSupportChangeOption

  constructor(option: WaveValueLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<WaveValueLoadingSupportChangeOption>({
          color: this.getOrDefault(option.color, '#76DAFF'),
          size: this.getOrDefault(option.size, 100),
          borderSize: this.getOrDefault(option.borderSize, '2px'),
          paddingSize: this.getOrDefault(option.paddingSize, '2px'),
          value: this.#checkValue(option.value || 0),
          fontSize: this.getOrDefault(option.fontSize, '20px'),
          fontColor: this.getOrDefault(option.fontColor, '#000'),
          fontWeight: this.getOrDefault(option.fontWeight, 'normal')
        }, {
          set: (target: WaveValueLoadingSupportChangeOption, key: keyof WaveValueLoadingSupportChangeOption, value) => {
            if (value !== undefined && value !== null) {
              // @ts-ignore
              target[key] = value
              if (key === 'value') {
                const querySelector = this.#loadingElement.querySelector(`.wj-loading-animation-wave-value-text`);
                if (querySelector) {
                  querySelector.innerHTML = value + '%'
                }
                this.#loadingElement.style.setProperty('--top', this.#createTopValue(value) + 'px')
              } else if (key === 'size') {
                this.#loadingElement.style.setProperty('--size', value + 'px')
                this.#loadingElement.style.setProperty('--top', this.#createTopValue(target.value) + 'px')
              } else {
                const styleList: (keyof WaveValueLoadingSupportChangeOption)[] = ['color', 'borderSize', 'paddingSize', 'fontSize', 'fontColor', 'fontWeight']
                if (styleList.includes(key)) {
                  this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
                }
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
    this.#loadingElement.style.setProperty('--top', this.#createTopValue(this.#supportChangeObject.value) + 'px')
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size + 'px')
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--border-size', this.#supportChangeObject.borderSize)
    this.#loadingElement.style.setProperty('--padding-size', this.#supportChangeObject.paddingSize)
    this.#loadingElement.style.setProperty('--font-size', this.#supportChangeObject.fontSize)
    this.#loadingElement.style.setProperty('--font-color', this.#supportChangeObject.fontColor)
    this.#loadingElement.style.setProperty('--font-weight', this.#supportChangeObject.fontWeight)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<WaveValueLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #checkValue(value: number) {
    if (!value || value <= 0) {
      return 0
    } else if (value >= 100) {
      return 100
    } else {
      return value
    }
  }

  #createTopValue(value: number) {
    const minInput = 0;
    const maxInput = 100;
    const minOutput = 0;
    const maxOutput = -this.#supportChangeObject.size;
    if (!value || value <= 0) {
      return minOutput
    }
    if (value >= 100) {
      return maxOutput
    }
    return minOutput + ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput);
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-wave-value')
    loadingElement.innerHTML = `<div class="wj-loading-animation-wave-value-wave"></div><div class="wj-loading-animation-wave-value-text">${this.#supportChangeObject.value}%</div>`
    return loadingElement
  }

  setValue(value: number) {
    this.#supportChangeObject.value = value
  }

  get [Symbol.toStringTag](){
    return 'WaveValueLoading'
  }
}
