import Loading, {LoadingOption, LoadingSupportChangeOption} from "../../core/loading";

export interface CircleLoaderLoadingOption extends LoadingOption, Partial<CircleLoaderLoadingSupportChangeOption> {
}

export interface CircleLoaderLoadingSupportChangeOption {
  color: string;
}

export default class CircleLoaderLoading extends Loading {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: CircleLoaderLoadingSupportChangeOption

  constructor(option: CircleLoaderLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<CircleLoaderLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#F44336')
    }, {
      set: (target: CircleLoaderLoadingSupportChangeOption, key: keyof CircleLoaderLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof CircleLoaderLoadingSupportChangeOption)[] = ['color']
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
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<CircleLoaderLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
          .${this.id} {
            position: relative;
            width: 60px;
            height: 60px;
          }
          
          .${this.id} div {
            height: 10px;
            width: 10px;
            background-color: var(--color);
            border-radius: 50%;
            position: absolute;
            -webkit-animation: 0.8s ${this.id}-opaque ease-in-out infinite both;
            animation: 0.8s ${this.id}-opaque ease-in-out infinite both;
          }
          
          .${this.id} > div:nth-child(1) {
            top: 0px;
            left: 25px;
          }
          .${this.id} > div:nth-child(2) {
            top: 8px;
            left: 43px;
            -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s;
          }
          .${this.id} > div:nth-child(3) {
            top: 25px;
            left: 50px;
            -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s;
          }
          .${this.id} > div:nth-child(4) {
            top: 43px;
            left: 43px;
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
          }
          .${this.id} > div:nth-child(5) {
            top: 50px;
            left: 25px;
            -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s;
          }
          .${this.id} > div:nth-child(6) {
            top: 43px;
            left: 8px;
            -webkit-animation-delay: 0.5s;
            animation-delay: 0.5s;
          }
          .${this.id} > div:nth-child(7) {
            top: 25px;
            left: 0px;
            -webkit-animation-delay: 0.6s;
            animation-delay: 0.6s;
          }
          .${this.id} > div:nth-child(8) {
            top: 8px;
            left: 8px;
            -webkit-animation-delay: 0.7s;
            animation-delay: 0.7s;
          }
          @keyframes ${this.id}-opaque {
            0% {
              opacity: 0.1;
            }
            40% {
              opacity: 1;
            }
            80% {
              opacity: 0.1;
            }
            100% {
              opacity: 0.1;
            }
          }
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    loadingElement.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'
    return loadingElement
  }

}
