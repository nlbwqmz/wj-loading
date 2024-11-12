import Loading, {LoadingOption} from "../../core/loading";

export interface TextLoadingOption extends LoadingOption {
  color?: string | number;
  size?: string;
  text: string;
}


export default class TextLoading extends Loading {

  readonly #color: string | number
  readonly #size: string
  readonly #text: string

  constructor(option: TextLoadingOption) {
    super(option)
    this.#color = option.color || '#333'
    this.#size = option.size || '16px'
    this.#text = option.text || 'Loading...'
    console.log(this.#text.length)
    this.setContainerFlexCenter()
    this.addStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.finish()
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
            ${this.#size ? `font-size: ${this.#size};` : ''}
            ${this.#color ? `color: ${this.#color};` : ''}
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
