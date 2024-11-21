import Loading, {LoadingOption} from "../../core/loading";

export interface WaveLoadingOption extends LoadingOption {
  color?: string | number;
}


export default class WaveLoading extends Loading {

  readonly #color: string | number

  constructor(option: WaveLoadingOption = {}) {
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
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  margin: -25px 0 0 -25px;
  border-radius: 50%;
}

.${this.id}:before, .${this.id}:after {
  content: '';
  border: 2px solid ${this.#color};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0px;
}

.${this.id}:before {
  -webkit-transform: scale(1, 1);
      -ms-transform: scale(1, 1);
          transform: scale(1, 1);
  opacity: 1;
  -webkit-animation: ${this.id}-spWaveBe 0.6s infinite linear;
          animation: ${this.id}-spWaveBe 0.6s infinite linear;
}

.${this.id}:after {
  -webkit-transform: scale(0, 0);
      -ms-transform: scale(0, 0);
          transform: scale(0, 0);
  opacity: 0;
  -webkit-animation: ${this.id}-spWaveAf 0.6s infinite linear;
          animation: ${this.id}-spWaveAf 0.6s infinite linear;
}

@-webkit-keyframes ${this.id}-spWaveAf {
  from {
    -webkit-transform: scale(0.5, 0.5);
            transform: scale(0.5, 0.5);
    opacity: 0;
  }
  to {
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
    opacity: 1;
  }
}
@keyframes ${this.id}-spWaveAf {
  from {
    -webkit-transform: scale(0.5, 0.5);
            transform: scale(0.5, 0.5);
    -webkit-transform: scale(0.5, 0.5);
            transform: scale(0.5, 0.5);
    opacity: 0;
  }
  to {
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
    opacity: 1;
  }
}
@-webkit-keyframes ${this.id}-spWaveBe {
  from {
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
    opacity: 1;
  }
  to {
    -webkit-transform: scale(1.5, 1.5);
            transform: scale(1.5, 1.5);
    opacity: 0;
  }
}
@keyframes ${this.id}-spWaveBe {
  from {
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
    opacity: 1;
  }
  to {
    -webkit-transform: scale(1.5, 1.5);
            transform: scale(1.5, 1.5);
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
