import Loading, {LoadingOption} from "../../core/loading";

export interface JellyLoadingOption extends LoadingOption {
  color?: string | number
  shadowColor?: string | number
  shadowOpacity?: number
}


export default class JellyLoading extends Loading {
  readonly #color: string | number
  readonly #shadowColor: string | number
  readonly #shadowOpacity: number

  constructor(option: JellyLoadingOption) {
    super(option)
    this.#color = option.color || '#fff'
    this.#shadowColor = option.shadowColor || '#000'
    this.#shadowOpacity = option.shadowOpacity || 0.1
    this.setContainerFlexCenter()
    this.addStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.finish()
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
}
.${this.id}-box {
  width: 50px;
  height: 50px;
  background: ${this.#color};
  animation: ${this.id}-animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
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
  background: ${this.#shadowColor};
  opacity: ${this.#shadowOpacity};
  position: absolute;
  top: 59px;
  left: 0;
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
    return `
        <div class="${this.id}">
          <div class="${this.id}-shadow"></div>
          <div class="${this.id}-box"></div>
        </div>
        `
  }

}
