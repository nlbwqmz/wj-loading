import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface TextFillLoadingOption extends LoadingOption, Partial<TextFillLoadingSupportChangeOption> {
}

export interface TextFillLoadingSupportChangeOption {
  color: string
  fillColor: string
  size: string;
  text: string;
  direction: 'horizontal' | 'vertical';
}

export declare type TextFillLoadingType = TextFillLoading;

export default class TextFillLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: TextFillLoadingSupportChangeOption

  constructor(option: TextFillLoadingOption = {}) {
    super(option)
    let direction: 'horizontal' | 'vertical'
    if ('horizontal' !== option.direction && 'vertical' !== option.direction) {
      direction = 'vertical'
    } else {
      direction = option.direction
    }
    this.#supportChangeObject = new Proxy<TextFillLoadingSupportChangeOption>({
          color: this.getOrDefault(option.color, '#FFF'),
          fillColor: this.getOrDefault(option.fillColor, '#76DAFF'),
          size: this.getOrDefault(option.size, '40px'),
          text: this.getOrDefault(option.text, 'Loading'),
          direction: direction
        }, {
          set: (target: TextFillLoadingSupportChangeOption, key: keyof TextFillLoadingSupportChangeOption, value) => {
            if (value !== undefined && value !== null) {
              // @ts-ignore
              target[key] = value
              const styleList: (keyof TextFillLoadingSupportChangeOption)[] = ['color', 'fillColor', 'size', 'direction']
              if (styleList.includes(key)) {
                this.#handleStyleChange()
              } else if (key === 'text') {
                this.#loadingElement.style.setProperty('--text', `'${value}'`)
                this.#loadingElement.innerHTML = value
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

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TextFillLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
    this.#loadingElement.style.setProperty('--text', `'${this.#supportChangeObject.text}'`)
    this.#handleStyleChange()
  }

  #handleStyleChange(){
    const convertResult = this.#convert()
    this.#loadingElement.style.setProperty('--background-color', convertResult.backgroundColor)
    this.#loadingElement.style.setProperty('--fill-color', convertResult.fillColor)
    this.#loadingElement.style.setProperty('--wj-loading-animation-text-fill-direction', convertResult.keyframes)
  }

  #convert() {
    if (this.#supportChangeObject.direction === 'horizontal') {
      return {
        backgroundColor: this.#supportChangeObject.color,
        fillColor: this.#supportChangeObject.fillColor,
        keyframes: 'wj-loading-animation-text-fill-horizontal'
      }
    }
    return {
      backgroundColor: this.#supportChangeObject.fillColor,
      fillColor: this.#supportChangeObject.color,
      keyframes: 'wj-loading-animation-text-fill-vertical'
    }
  }

  #createLoadingElement() {
    const divElement = document.createElement('div');
    divElement.classList.add('wj-loading-animation-text-fill')
    divElement.innerHTML = this.#supportChangeObject.text
    return divElement
  }

  get [Symbol.toStringTag](){
    return 'TextFillLoading'
  }

}
