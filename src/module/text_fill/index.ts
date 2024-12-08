import Loading, {LoadingOption, LoadingSupportChangeOption} from "../../core/loading";

export interface TextFillLoadingOption extends LoadingOption, Partial<TextFillLoadingSupportChangeOption> {
}

export interface TextFillLoadingSupportChangeOption {
  color: string
  fillColor: string
  size: string;
  text: string;
  direction: 'horizontal' | 'vertical';
}


export default class TextFillLoading extends Loading {

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
              const styleList: (keyof TextFillLoadingSupportChangeOption)[] = ['color', 'fillColor', 'size']
              if (styleList.includes(key)) {
                this.setChildrenStyle(this.#createStyle())
              } else if (key === 'text') {
                this.#loadingElement.innerHTML = value
              }
            }
            return true
          }
        }
    )
    this.setChildrenStyle(this.#createStyle())
    this.#loadingElement = this.#createLoadingElement()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<TextFillLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    const convertResult = this.#convert()
    style.innerHTML = `
.${this.id} {
  font-size: ${this.#supportChangeObject.size};
  font-weight: bold;
  display: inline-block;
  letter-spacing: 2px;
  position: relative;
  color: ${convertResult.backgroundColor};
  box-sizing: border-box;
}
.${this.id}::after {
  content: '${this.#supportChangeObject.text}';
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

  #convert() {
    const result: { backgroundColor?: number | string, fillColor?: number | string, keyframes?: string } = {}
    if (this.#supportChangeObject.direction === 'horizontal') {
      result.backgroundColor = this.#supportChangeObject.color
      result.fillColor = this.#supportChangeObject.fillColor
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
    } else if (this.#supportChangeObject.direction === 'vertical') {
      result.backgroundColor = this.#supportChangeObject.fillColor
      result.fillColor = this.#supportChangeObject.color
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
    divElement.innerHTML = this.#supportChangeObject.text
    return divElement
  }

}
