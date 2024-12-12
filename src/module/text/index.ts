import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";

export interface TextLoadingOption extends LoadingOption, Partial<TextLoadingSupportChangeOption> {
  text?: string;
}

export interface TextLoadingSupportChangeOption {
  color: string;
  size: string;
}

export declare type TextLoadingType = TextLoading;

export default class TextLoading extends LoadingTop {

  readonly #text: string
  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: TextLoadingSupportChangeOption

  constructor(option: TextLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<TextLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#333'),
      size: this.getOrDefault(option.size, '16px')
    }, {
      set: (target: TextLoadingSupportChangeOption, key: keyof TextLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof TextLoadingSupportChangeOption)[] = ['color', 'size']
          if (styleList.includes(key)) {
            this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
          }
        }
        return true
      }
    })
    this.#text = this.getOrDefault(option.text, 'Loading...')
    this.setChildrenStyle(this.#createStyle())
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TextLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    let delay = 0.48
    const style = document.createElement('style')
    style.innerHTML = `
          .${this.id} {
            display: flex;
          }
          .${this.id} div {
            animation-name: ${this.id}-loading;
            animation-duration: ${delay + 0.05 * (this.#text.length - 1)}s;
            animation-iteration-count: infinite;
            animation-direction: linear;
            font-size: var(--size);
            color: var(--color);
          }
          @keyframes ${this.id}-loading {
            0% {
              opacity: 0.2;
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `

    for (let i = 0; i < this.#text.length; i++) {
      style.innerHTML += `
            .${this.id}-item-${i} {
              animation-delay: ${delay + 0.05 * i}s;
            }
      `
    }
    return style
  }

  #createLoadingElement() {
    const divElement = document.createElement('div');
    divElement.classList.add(this.id)
    for (let i = 0; i < this.#text.length; i++) {
      divElement.innerHTML += `<div class="${this.id}-item-${i}">${this.#text.charAt(i)}</div>`
    }
    return divElement
  }

}
