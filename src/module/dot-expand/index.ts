import Loading, {LoadingOption} from "../../core/loading";

export interface DotExpandLoadingOption extends LoadingOption {
  color?: string | number;
}


export default class DotExpandLoading extends Loading {

  readonly #color: string | number

  constructor(option: DotExpandLoadingOption) {
    super(option)
    this.#color = option.color || '#000'
    this.setContainerFlexCenter()
    this.addStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.finish()
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${this.#color};

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
    return `<div class="${this.id}"></div>`
  }

}
