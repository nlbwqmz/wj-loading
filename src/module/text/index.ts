import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface TextLoadingOption extends LoadingOption, Partial<TextLoadingSupportChangeOption> {}

export interface TextLoadingSupportChangeOption {
  color: string;
  size: string;
  text: string;
}

export declare type TextLoadingType = TextLoading;

export default class TextLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: TextLoadingSupportChangeOption
  readonly #delay: number = 0.48

  constructor(option: TextLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<TextLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#333'),
      size: this.getOrDefault(option.size, '16px'),
      text: this.getOrDefault(option.text, 'Loading...')
    }, {
      set: (target: TextLoadingSupportChangeOption, key: keyof TextLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof TextLoadingSupportChangeOption)[] = ['color', 'size']
          if (styleList.includes(key)) {
            this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
          } else if (key === 'text') {
            this.#loadingElement.style.setProperty('--animation-duration', `${this.#delay + 0.05 * (this.#supportChangeObject.text.length - 1)}s`)
            this.#handleTextChange()
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
    this.#loadingElement.style.setProperty('--animation-duration', `${this.#delay + 0.05 * (this.#supportChangeObject.text.length - 1)}s`)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TextLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const divElement = document.createElement('div');
    divElement.classList.add('wj-loading-animation-text')
    for (let i = 0; i < this.#supportChangeObject.text.length; i++) {
      divElement.innerHTML += `<div style="animation-delay: ${this.#delay + 0.05 * i}s">${this.#supportChangeObject.text.charAt(i)}</div>`
    }
    return divElement
  }

  #handleTextChange() {
    let html = ''
    for (let i = 0; i < this.#supportChangeObject.text.length; i++) {
      html += `<div style="animation-delay: ${this.#delay + 0.05 * i}s">${this.#supportChangeObject.text.charAt(i)}</div>`
    }
    this.#loadingElement.innerHTML = html
  }

  get [Symbol.toStringTag](){
    return 'TextLoading'
  }

}
