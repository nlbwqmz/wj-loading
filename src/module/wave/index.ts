import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";
import './index.css'

export interface WaveLoadingOption extends LoadingOption, Partial<WaveLoadingSupportChangeOption> {
}

export interface WaveLoadingSupportChangeOption {
  color: string;
}

export declare type WaveLoadingType = WaveLoading;


export default class WaveLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: WaveLoadingSupportChangeOption

  constructor(option: WaveLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<WaveLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#000')
    }, {
      set: (target: WaveLoadingSupportChangeOption, key: keyof WaveLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof WaveLoadingSupportChangeOption)[] = ['color']
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

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<WaveLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('wj-loading-animation-wave')
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'WaveLoading'
  }
}
