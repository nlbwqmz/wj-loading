import Loading, {LoadingOption} from "../../core/loading";

export interface TextFillLoadingOption extends LoadingOption {
  color?: string | number
  fillColor?: string | number
  size?: string;
  text?: string;
  direction?: 'horizontal' | 'vertical';
}


export default class TextFillLoading extends Loading {

  readonly #color: string | number
  readonly #fillColor: string | number
  readonly #size: string
  readonly #text: string
  readonly #direction: 'horizontal' | 'vertical';

  constructor(option: TextFillLoadingOption = {}) {
    super(option)
    this.#color = option.color || '#FFF'
    this.#fillColor = option.color || '#76DAFF'
    if('horizontal' !== option.direction && 'vertical' !== option.direction) {
      this.#direction = 'vertical'
    } else {
      this.#direction = option.direction
    }
    this.#size = option.size || '40px'
    this.#text = option.text || 'Loading'
    this.setContainerFlexCenter()
    this.setChildrenStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.finish()
  }

  #createStyle() {
    const style = document.createElement('style')
    const convertResult = this.#convert()
    style.innerHTML = `
.${this.id} {
  font-size: ${this.#size};
  font-weight: bold;
  display: inline-block;
  letter-spacing: 2px;
  position: relative;
  color: ${convertResult.backgroundColor};
  box-sizing: border-box;
}
.${this.id}::after {
  content: '${this.#text}';
  position: absolute;
  left: 0;
  top: 0;
  color: ${convertResult.fillColor};
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  animation: ${this.id}-animloader 2s linear infinite;
}
${convertResult.keyframes}
        `

    return style
  }

  #convert(){
    const result: { backgroundColor?: number | string, fillColor?: number | string, keyframes?: string } = {}
    if(this.#direction === 'horizontal'){
      result.backgroundColor = this.#color
      result.fillColor = this.#fillColor
      result.keyframes = `
          @keyframes ${this.id}-animloader {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `
    } else if (this.#direction === 'vertical'){
      result.backgroundColor = this.#fillColor
      result.fillColor = this.#color
      result.keyframes = `
          @keyframes ${this.id}-animloader {
            0% {
              height: 100%;
            }
            100% {
              height: 0%;
            }
          }
        `
    }
    return result
  }

  #createLoadingElement() {
    const divElement = document.createElement('div');
    divElement.classList.add(this.id)
    divElement.innerHTML = this.#text
    return divElement
  }

}
