import LoadingTop, {LoadingOption, LoadingSupportChangeOption} from "../../core/loadingTop";

export interface JellyLoadingOption extends LoadingOption, Partial<JellyLoadingSupportChangeOption> {
}

export interface JellyLoadingSupportChangeOption {
  color: string
  shadowColor: string
  shadowOpacity: string
}

export declare type JellyLoadingType = JellyLoading;

export default class JellyLoading extends LoadingTop {
  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: JellyLoadingSupportChangeOption

  constructor(option: JellyLoadingOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<JellyLoadingSupportChangeOption>({
          color: this.getOrDefault(option.color, '#fff'),
          shadowColor: this.getOrDefault(option.shadowColor, '#000'),
          shadowOpacity: this.getOrDefault(option.shadowOpacity, '0.1')
        }, {
          set: (target: JellyLoadingSupportChangeOption, key: keyof JellyLoadingSupportChangeOption, value) => {
            if (value !== undefined && value !== null) {
              // @ts-ignore
              target[key] = value
              const styleList: (keyof JellyLoadingSupportChangeOption)[] = ['color', 'shadowColor', 'shadowOpacity']
              if (styleList.includes(key)) {
                this.#loadingElement.style.setProperty(this.convertToCssVariableName(key), value)
              }
            }
            return true
          }
        }
    )
    this.setChildrenStyle(this.#createStyle())
    this.#loadingElement = this.#createLoadingElement()
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color', this.#supportChangeObject.color)
    this.#loadingElement.style.setProperty('--shadow-color', this.#supportChangeObject.shadowColor)
    this.#loadingElement.style.setProperty('--shadow-opacity', this.#supportChangeObject.shadowOpacity)
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<JellyLoadingSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.${this.id}-box {
  width: 50px;
  height: 50px;
  background: var(--color);
  animation: ${this.id}-animate .5s linear infinite;
  border-radius: 3px;
}
@keyframes ${this.id}-animate {
  17% { border-bottom-right-radius: 3px; }
  25% { transform: translateY(9px) rotate(22.5deg); }
  50% {
    transform: translateY(18px) scale(1,.9) rotate(45deg) ;
    border-bottom-right-radius: 40px;
  }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }
} 
.${this.id}-shadow { 
  width: 50px;
  height: 5px;
  background: var(--shadow-color);
  opacity: var(--shadow-opacity);
  border-radius: 50%;
  animation: ${this.id}-shadow .5s linear infinite;
}
@keyframes ${this.id}-shadow {
  50% {
    transform: scale(1.2,1);
  }
}
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    loadingElement.innerHTML = `
      <div class="${this.id}-box"></div>
      <div class="${this.id}-shadow"></div>
    `
    return loadingElement
  }

  get [Symbol.toStringTag](){
    return 'JellyLoading'
  }

}
