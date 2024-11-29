import Loading, {LoadingOption} from "../../core/loading";

export interface WaveValueLoadingOption extends LoadingOption {
  color?: string | number;
  size?: number;
  value?: number;
  fontSize?: string;
  fontColor?: string | number;
  fontWeight?: string | number;
}


export default class WaveValueLoading extends Loading {

  readonly #color: string | number
  readonly #size: number
  #value: number
  readonly #fontSize: string
  readonly #fontColor: string | number
  readonly #fontWeight: string | number

  constructor(option: WaveValueLoadingOption = {}) {
    super(option)
    this.#color = option.color || '#76DAFF'
    this.#size = option.size || 100
    this.#value = this.#checkValue(option.value || 0)
    this.#fontSize = option.fontSize || '20px'
    this.#fontColor = option.fontColor || '#000'
    this.#fontWeight = option.fontWeight || 'normal'
    this.setContainerFlexCenter()
    this.setChildrenStyle(this.#createStyle(this.#value))
    this.addElement(this.#createLoadingElement())
    this.finish()
  }

  #checkValue(value: number) {
    if (!value || value <= 0) {
      return 0
    } else if (value >= 100) {
      return 100
    } else {
      return value
    }
  }

  #createTopValue(value: number) {
    const minInput = 0;
    const maxInput = 100;
    // 10是父容器border(5+5)和padding(5+5)
    const minOutput = this.#size / 2 - 20;
    const maxOutput = (-(this.#size / 2)) - 20;
    if (!value || value <= 0) {
      return minOutput
    }
    if (value >= 100) {
      return maxOutput
    }
    return minOutput + ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput);
  }

  #createStyle(value: number) {
    const top = this.#createTopValue(value)
    const style = document.createElement('style')
    style.innerHTML = `
.${this.id} {
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  width: ${this.#size}px;
  height: ${this.#size}px;
  padding: 5px;
  border: 5px solid ${this.#color};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
}

.${this.id}-wave {
  position: relative;
  width: ${this.#size}px;
  height: ${this.#size}px;
  background-color: ${this.#color};
  border-radius: 50%;
}
.${this.id}-wave::before, .${this.id}-wave::after {
  content: "";
  position: absolute;
  width: ${this.#size * 2}px;
  height: ${this.#size * 2}px;
  top: ${top}px;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 45%;
  transition: top 0.5s ease;
  transform: translate(-50%, -70%) rotate(0);
  -webkit-animation: ${this.id}-rotate 6s linear infinite;
          animation: ${this.id}-rotate 6s linear infinite;
  z-index: 1;
}
.${this.id}-wave::after {
  border-radius: 47%;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -70%) rotate(0);
  -webkit-animation: ${this.id}-rotate 10s linear -5s infinite;
          animation: ${this.id}-rotate 10s linear -5s infinite;
  z-index: 2;
}

.${this.id}-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${this.#fontSize};
  color: ${this.#fontColor};
  font-weight: ${this.#fontWeight};
  z-index: 10;
}

@-webkit-keyframes ${this.id}-rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}

@keyframes ${this.id}-rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
        `
    return style
  }

  #createLoadingElement() {
    return `<div class="${this.id}"><div class="${this.id}-wave"></div><div class="${this.id}-text">${this.#value}%</div></div>`
  }

  setValue(value: number) {
    this.#value = this.#checkValue(value)
    this.setChildrenStyle(this.#createStyle(this.#value))
    const text = document.querySelector(`.${this.id}-text`);
    if (text) {
      text.innerHTML = `${value}%`
    }
  }
}
