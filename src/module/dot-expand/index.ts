import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";

export interface DotExpandLoadingOption extends LoadingOption, Partial<DotExpandLoadingSupportChangeOption> {
}

export interface DotExpandLoadingSupportChangeOption {
  color: string;
}

export declare type DotExpandLoadingType = DotExpandLoading;

export default class DotExpandLoading extends LoadingTop {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: DotExpandLoadingSupportChangeOption

  constructor(option: DotExpandLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<DotExpandLoadingSupportChangeOption>({
      color: this.getOrDefault(option.color, '#000')
    }, {
      set: (target: DotExpandLoadingSupportChangeOption, key: keyof DotExpandLoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof DotExpandLoadingSupportChangeOption)[] = ['color']
          if (styleList.includes(key)) {
            this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
          }
        }
        return true
      }
    })
    this.setChildrenStyle(this.#createStyle())
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<DotExpandLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color);

  animation: ${this.id}-ball-scale infinite linear 0.75s;
}

@keyframes ${this.id}-ball-scale {
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'DotExpandLoading'
  }

}
