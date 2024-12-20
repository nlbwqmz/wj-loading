import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface MeshLoaderLoadingOption extends LoadingOption, Partial<MeshLoaderLoadingSupportChangeOption> {
}

export interface MeshLoaderLoadingSupportChangeOption {
  color: string;
}

export declare type MeshLoaderLoadingType = MeshLoaderLoading;

export default class MeshLoaderLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement;
  readonly #supportChangeObject: MeshLoaderLoadingSupportChangeOption;

  constructor(option: MeshLoaderLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<MeshLoaderLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#F44336')
    }, {
      set: (target: MeshLoaderLoadingSupportChangeOption, key: keyof MeshLoaderLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof MeshLoaderLoadingSupportChangeOption)[] = ['color']
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
    this.setSupportText(false)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<MeshLoaderLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-mesh-loader')
    loadingElement.innerHTML = `
          <div class="wj-loading-animation-mesh-loader-set-one">
            <div class="wj-loading-animation-mesh-loader-circle"></div>
            <div class="wj-loading-animation-mesh-loader-circle"></div>
          </div>
          <div class="wj-loading-animation-mesh-loader-set-two">
            <div class="wj-loading-animation-mesh-loader-circle"></div>
            <div class="wj-loading-animation-mesh-loader-circle"></div>
          </div>
    `
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'MeshLoaderLoading'
  }

}
