import Loading, {LoadingOption} from "../../core/loading";
import {FixedLengthArray} from "../../core/types";

export interface TripleSpinnerLoadingOption extends LoadingOption {
  color?: FixedLengthArray<string | number, 3>
  size?: string;
}

export default class TripleSpinnerLoading extends Loading {

  readonly #color: FixedLengthArray<string | number, 3>
  readonly #size: string

  constructor(option: TripleSpinnerLoadingOption) {
    super(option)
    this.#color = option.color && option.color.length >= 3 ? option.color : ['#FF5722', '#FF9800', '#FFC107']
    this.#size = option.size || '100px'
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
        position: relative;
        width: ${this.#size};
        height: ${this.#size};
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid ${this.#color[0]};
        -webkit-animation: ${this.id}-spin 2s linear infinite;
        animation: ${this.id}-spin 2s linear infinite;
      }
      
      .${this.id}::before,
      .${this.id}::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        border: 4px solid transparent;
      }
      .${this.id}::before {
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-top-color: ${this.#color[1]};
        -webkit-animation: ${this.id}-spin 3s linear infinite;
        animation: ${this.id}-spin 3.5s linear infinite;
      }
      .${this.id}::after {
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-top-color: ${this.#color[2]};
        -webkit-animation: ${this.id}-spin 1.5s linear infinite;
        animation: ${this.id}-spin 1.75s linear infinite;
      }
      -webkit-@keyframes ${this.id}-spin {
        -webkit-from {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        -webkit-to {
          -webkit-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      
      @-webkit-keyframes ${this.id}-spin {
        from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      
      @keyframes ${this.id}-spin {
        from {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
        `
    return style
  }

  #createLoadingElement() {
    return `
        <div class="${this.id}"></div>
        `
  }

}
