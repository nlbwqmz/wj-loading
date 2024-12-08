import Loading, {LoadingOption, LoadingSupportChangeOption} from "../../core/loading";

export interface CubesLoadingOption extends LoadingOption, Partial<CubesLoadingSupportChangeOption> {
}

export interface CubesLoadingSupportChangeOption {
  color: string;
  size: string;
}


export default class CubesLoading extends Loading {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: CubesLoadingSupportChangeOption

  constructor(option: CubesLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<CubesLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#333'),
      size: this.getOrDefault(option.size, '20px')
    }, {
      set: (target: CubesLoadingSupportChangeOption, key: keyof CubesLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          const styleList: (keyof CubesLoadingSupportChangeOption)[] = ['color', 'size']
          if (styleList.includes(key)) {
            this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
          }
        }
        return true
      }
    })
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.setChildrenStyle(this.#createStyle())
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--size', this.#supportChangeObject.size)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<CubesLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
          .${this.id} {
           display: grid;
           grid-template-columns: repeat(3, 1fr);
          }
          .${this.id}-sk-cube {
           width: var(--size);
           height: var(--size);
           background-color: var(--color);
           animation: ${this.id}-sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          }
          .${this.id}-sk-cube1 {
           animation-delay: 0.2s;
          }
          .${this.id}-sk-cube2 {
           animation-delay: 0.3s;
          }
          .${this.id}-sk-cube3 {
           animation-delay: 0.4s;
          }
          .${this.id}-sk-cube4 {
           animation-delay: 0.1s;
          }
          .${this.id}-sk-cube5 {
           animation-delay: 0.2s;
          }
          .${this.id}-sk-cube6 {
           animation-delay: 0.3s;
          }
          .${this.id}-sk-cube7 {
           animation-delay: 0s;
          }
          .${this.id}-sk-cube8 {
           animation-delay: 0.1s;
          }
          .${this.id}-sk-cube9 {
           animation-delay: 0.2s;
          }
          @keyframes ${this.id}-sk-cubeGridScaleDelay {
           0%,
           70%,
           100% {
            transform: scale3D(1, 1, 1);
           }
           35% {
            transform: scale3D(0, 0, 1);
           }
          }
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    loadingElement.innerHTML = `
      <div class="${this.id}-sk-cube ${this.id}-sk-cube1"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube2"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube3"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube4"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube5"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube6"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube7"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube8"></div>
      <div class="${this.id}-sk-cube ${this.id}-sk-cube9"></div>
    `
    return loadingElement
  }

}
