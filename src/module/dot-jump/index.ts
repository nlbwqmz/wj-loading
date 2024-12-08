import Loading, {LoadingOption, LoadingSupportChangeOption} from "../../core/loading";
import {FixedLengthArray} from "../../core/types";

export interface DotJumpOption extends LoadingOption, Partial<DotJumpSupportChangeOption> {
}

export interface DotJumpSupportChangeOption {
  color: FixedLengthArray<string, 2>
}


export default class DotJumpLoading extends Loading {

  readonly #loadingElement: HTMLDivElement
  readonly #supportChangeObject: DotJumpSupportChangeOption

  constructor(option: DotJumpOption = {}) {
    super(option)
    this.#supportChangeObject = new Proxy<DotJumpSupportChangeOption>({
      color: option.color && option.color.length >= 2 ? option.color : ['#000', '#000']
    }, {
      set: (target: DotJumpSupportChangeOption, key: keyof DotJumpSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof DotJumpSupportChangeOption)[] = ['color']
          if (styleList.includes(key)) {
            if (key === 'color') {
              if (value && value.length >= 2) {
                this.#loadingElement.style.setProperty('--color-0', value[0])
                this.#loadingElement.style.setProperty('--color-1', value[1])
              }
            }

          }
        }
        return true
      }
    })
    this.setChildrenStyle(this.#createStyle())
    this.#loadingElement = this.#createLoadingElement();
    this.#setVariable()
    this.addElement(this.#loadingElement)
    this.finish()
  }

  #setVariable() {
    this.#loadingElement.style.setProperty('--color-0', this.#supportChangeObject.color[0])
    this.#loadingElement.style.setProperty('--color-1', this.#supportChangeObject.color[1])
  }

  setOption(option: Partial<LoadingSupportChangeOption> | Partial<DotJumpSupportChangeOption>) {
    if (option) {
      super.setOption(<Partial<LoadingSupportChangeOption>>option)
      Object.assign(this.#supportChangeObject, option)
    }
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  display: block;
  font-size: 0;
  color: var(--color-0);
}
.${this.id},
.${this.id} > div {
  position: relative;
  box-sizing: border-box;
}
.${this.id} > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}
.${this.id} {
  width: 42px;
  height: 32px;
}
.${this.id} > div:nth-child(1) {
  position: absolute;
  bottom: 32%;
  left: 18%;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  transform-origin: center bottom;
  animation: ${this.id}-ball-climbing-dot-jump 0.6s ease-in-out infinite;
}
.${this.id} > div:not(:nth-child(1)) {
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 2px;
  border-radius: 0;
  background-color: var(--color-1);
  transform: translate(60%, 0);
  animation: ${this.id}-ball-climbing-dot-steps 1.8s linear infinite;
}
.${this.id} > div:not(:nth-child(1)):nth-child(2) {
  animation-delay: 0ms;
}
.${this.id} > div:not(:nth-child(1)):nth-child(3) {
  animation-delay: -600ms;
}
.${this.id} > div:not(:nth-child(1)):nth-child(4) {
  animation-delay: -1200ms;
}
@keyframes ${this.id}-ball-climbing-dot-jump {
  0% {
    transform: scale(1, 0.7);
  }
  20% {
    transform: scale(0.7, 1.2);
  }
  40% {
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    transform: scale(1, 1);
  }
  80% {
    transform: scale(0.7, 1.2);
  }
  90% {
    transform: scale(0.7, 1.2);
  }
  100% {
    transform: scale(1, 0.7);
  }
}
@keyframes ${this.id}-ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}
        `
    return style
  }

  #createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add(this.id)
    loadingElement.innerHTML = '<div></div><div></div><div></div><div></div>'
    return loadingElement
  }

}
