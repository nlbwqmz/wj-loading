import Loading, {LoadingOption} from "../../core/loading";

export interface MeshLoaderLoadingOption extends LoadingOption {
  color?: string | number;
}

export default class MeshLoaderLoading extends Loading {

  readonly #color: string | number;

  constructor(option: MeshLoaderLoadingOption = {}) {
    super(option)
    this.#color = option.color || '#F44336'
    this.setContainerFlexCenter()
    this.setChildrenStyle(this.#createStyle())
    this.addElement(this.#createLoadingElement())
    this.finish()
  }

  #createStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
          .${this.id} {
            overflow: hidden;
            height: inherit;
            width: inherit;
          }
          .${this.id} .${this.id}-circle {
            width: 30px;
            height: 30px;
            position: absolute;
            background: ${this.#color};
            border-radius: 50%;
            margin: -15px;
            -webkit-animation: ${this.id}-mesh 3s ease-in-out infinite -1.5s;
            animation: ${this.id}-mesh 3s ease-in-out infinite -1.5s;
          }
          
          .${this.id} > div .${this.id}-circle:last-child {
            -webkit-animation-delay: 0s;
            animation-delay: 0s;
          }
          
          .${this.id} > div {
            position: absolute;
            top: 50%;
            left: 50%;
          }
          
          .${this.id} > div:last-child {
            -webkit-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
          }
          
          @-webkit-keyframes ${this.id}-mesh {
            0% {
              -webkit-transform-origin: 50% -100%;
              transform-origin: 50% -100%;
              -webkit-transform: rotate(0);
              transform: rotate(0);
            }
            50% {
              -webkit-transform-origin: 50% -100%;
              transform-origin: 50% -100%;
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
            50.1% {
              -webkit-transform-origin: 50% 200%;
              transform-origin: 50% 200%;
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform-origin: 50% 200%;
              transform-origin: 50% 200%;
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          
          @keyframes ${this.id}-mesh {
            0% {
              -webkit-transform-origin: 50% -100%;
              transform-origin: 50% -100%;
              -webkit-transform: rotate(0);
              transform: rotate(0);
            }
            50% {
              -webkit-transform-origin: 50% -100%;
              transform-origin: 50% -100%;
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
            50.1% {
              -webkit-transform-origin: 50% 200%;
              transform-origin: 50% 200%;
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform-origin: 50% 200%;
              transform-origin: 50% 200%;
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `
    return style
  }

  #createLoadingElement() {
    return `
        <div class="${this.id}">
          <div class="${this.id}-set-one">
            <div class="${this.id}-circle"></div>
            <div class="${this.id}-circle"></div>
          </div>
          <div class="${this.id}-set-two">
            <div class="${this.id}-circle"></div>
            <div class="${this.id}-circle"></div>
          </div>
        </div>
        `
  }

}
