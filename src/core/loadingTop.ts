import './loadingTop.css'
export interface LoadingSupportChangeOption {
  // 移除后执行
  afterRemove: () => void
  // 背景
  background: string
  gaussianBlur: boolean | string
  zIndex: string
  // 执行时时间（毫秒）
  interval: number
  // 延迟remove
  delayRemove: number
  // 底部文字
  tipText: string
  // 底部文字class
  tipTextClass: string
}

export interface LoadingOption extends Partial<LoadingSupportChangeOption> {
  // 节点
  element?: string | Element | null
  // 立即执行
  immediate?: boolean
}

const generateId = (length: number = 8) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsetLength = charset.length;
  let randomString = '';
  const buffer = new Uint32Array(Math.ceil(length / 4));
  window.crypto.getRandomValues(buffer);
  for (let i = 0; i < length; i++) {
    const randomValue = buffer[Math.floor(i / 4)] >>> (i % 4 * 8) & 0xFF;
    randomString += charset[randomValue % charsetLength];
  }
  return randomString;
}

export type LoadingTopType = LoadingTop

export default class LoadingTop {
  protected readonly id: string
  // 已渲染
  protected rendered: boolean
  protected readonly element: Element
  // 立即执行
  protected readonly immediate?: boolean
  protected readonly container: HTMLDivElement
  protected readonly animationContainer: HTMLDivElement
  protected readonly textContainer: HTMLDivElement
  #supportText: boolean = true
  // 渲染成功后执行
  protected afterRendered?: () => void
  // 元素宽或高改变后触发
  protected handleElementChange?: () => void
  #currentOffsetHeight?: number
  #currentOffsetWidth?: number
  #observer?: ResizeObserver
  readonly #supportChangeObject: LoadingSupportChangeOption

  constructor(option: LoadingOption = {}) {
    this.#supportChangeObject = new Proxy<LoadingSupportChangeOption>({
      afterRemove: this.getOrDefault(option.afterRemove, () => {
      }),
      background: this.getOrDefault(option.background, 'rgba(0, 0, 0, 0.2)'),
      zIndex: this.getOrDefault(option.zIndex, '2000'),
      interval: this.getOrDefault(option.interval, 0),
      delayRemove: this.getOrDefault(option.delayRemove, 0),
      tipText: this.getOrDefault(option.tipText, ''),
      tipTextClass: this.getOrDefault(option.tipTextClass, ''),
      gaussianBlur: this.getOrDefault(option.gaussianBlur, false),
    }, {
      set: (target: LoadingSupportChangeOption, key: keyof LoadingSupportChangeOption, value) => {
        if (value !== undefined && value !== null) {
          // @ts-ignore
          target[key] = value
          const styleList: (keyof LoadingSupportChangeOption)[] = ['background', 'zIndex']
          if (styleList.includes(key)) {
            this.container.style.setProperty(this.convertToCssVariableName(key), value)
          }
          if(key === 'gaussianBlur' && value) {
            if(typeof value === 'boolean'){
              this.container.style.setProperty('--backdrop-filter', '5px')
            } else if(typeof value === 'string'){
              this.container.style.setProperty('--backdrop-filter', value)
            }
          } else {
            this.container.style.setProperty('--backdrop-filter', '0px')
          }
          if(this.#supportText){
            if(key === 'tipText') {
              this.textContainer.innerHTML = value
            } else if(key === 'tipTextClass') {
              this.textContainer.setAttribute('class', `wj-loading-text-container`)
              this.textContainer.classList.add(value)
            }
          }

        }
        return true
      }
    })
    this.id = `wj-loading-${generateId()}`
    this.rendered = false
    this.element = this.#selectElement(option.element)
    this.immediate = option.immediate
    this.container = document.createElement('div')
    this.animationContainer = document.createElement('div')
    this.textContainer = document.createElement('div')
  }

  protected getOrDefault(value: any, defaultValue: any) {
    return value !== undefined && value != null ? value : defaultValue
  }

  #setVariable(width: number, height: number) {
    this.container.style.setProperty('--background', this.#supportChangeObject.background)
    this.container.style.setProperty('--z-index', this.#supportChangeObject.zIndex)
    this.#setSizeVariable(width, height)
  }

  #setSizeVariable(width: number, height: number) {
    this.container.style.setProperty('--left', this.element.scrollLeft + 'px')
    this.container.style.setProperty('--top', this.element.scrollTop + 'px')
    this.container.style.setProperty('--width', width + 'px')
    this.container.style.setProperty('--height', height + 'px')

    if(this.#supportChangeObject.gaussianBlur){
      if(typeof this.#supportChangeObject.gaussianBlur === 'boolean'){
        this.container.style.setProperty('--backdrop-filter', '5px')
      } else {
        this.container.style.setProperty('--backdrop-filter', this.#supportChangeObject.gaussianBlur)
      }
    } else {
      this.container.style.setProperty('--backdrop-filter', '0px')
    }
  }

  // 将参数名转为css变量名
  protected convertToCssVariableName(name: string) {
    return '--' + name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
  }

  setSupportText(flag: boolean) {
    this.#supportText = flag
  }

  setOption(option: Partial<LoadingSupportChangeOption>) {
    if (option) {
      Object.assign(this.#supportChangeObject, option)
    }
  }

  /**
   * 初始化容器样式
   */
  #initContainerStyle() {
    const boundingClientRect = this.element.getBoundingClientRect();
    const width = this.element === document.body ? window.innerWidth : boundingClientRect.width
    const height = this.element === document.body ? window.innerHeight : boundingClientRect.height
    this.#currentOffsetWidth = width
    this.#currentOffsetHeight = height
    this.#setVariable(width, height)
  }

  #listen() {
    this.#observer = new ResizeObserver(() => {
      const boundingClientRect = this.element.getBoundingClientRect();
      const width = this.element === document.body ? window.innerWidth : boundingClientRect.width
      const height = this.element === document.body ? window.innerHeight : boundingClientRect.height
      if (this.#currentOffsetHeight !== height || this.#currentOffsetWidth !== width) {
        this.#currentOffsetWidth = width
        this.#currentOffsetHeight = height
        this.#setSizeVariable(width, height)
        this.handleElementChange && this.handleElementChange()
      }
    })
    this.#observer.observe(this.element)
  }

  /**
   * 初始化容器元素
   */
  #initContainerElement() {
    this.container.classList.add(`wj-loading-container`)
    this.animationContainer.classList.add(`wj-loading-animation-container`)
    this.container.append(this.animationContainer)
    if(this.#supportText){
      if(this.#supportChangeObject.tipText){
        this.textContainer.innerHTML = this.#supportChangeObject.tipText
      }
      if(this.#supportChangeObject.tipTextClass){
        this.textContainer.classList.add(`wj-loading-text-container`, this.#supportChangeObject.tipTextClass)
      }
      this.container.append(this.textContainer)
    }
  }

  /**
   * 查到目标元素
   */
  #selectElement(element?: string | Element | null) {
    if (element) {
      if (typeof (element) === 'string') {
        const ele: Element | null = document.querySelector(element);
        if (!ele) {
          throw new Error(`未找到当前节点：${element}`)
        }
        return ele
      } else {
        return element
      }
    } else {
      return document.body
    }
  }

  /**
   * 添加节点
   */
  protected addElement(dom: Element) {
    this.animationContainer.appendChild(dom)
  }

  protected finish() {
    this.#initContainerStyle()
    this.#initContainerElement()
    if (this.immediate) {
      this.loading(this.#supportChangeObject.interval)
    }
  }

  /**
   * 执行loading
   */
  loading(interval?: number) {
    if (this.rendered) {
      return
    }

    if (!['relative', 'absolute', 'fixed'].includes(window.getComputedStyle(this.element).position)) {
      this.element.classList.add(`wj-loading-relative`)
    }
    this.element.classList.add(`wj-loading-lock`)
    this.element.appendChild(this.container)
    this.#listen()
    this.rendered = true
    let targetInterval
    if (interval === undefined || interval === null) {
      targetInterval = this.#supportChangeObject.interval || 0
    } else {
      targetInterval = interval
    }
    if (targetInterval > 0) {
      setTimeout(() => {
        this.remove().then(() => {})
      }, targetInterval)
    }
    this.afterRendered && this.afterRendered()
  }

  /**
   * 移除
   */
  remove(delayRemove?: number) {
    return new Promise<void>((resolve, reject) => {
      if (!this.rendered) {
        resolve()
        return
      }
      const r = () => {
        this.#observer && this.#observer.disconnect()
        // 平滑过渡 处理loading闪烁问题
        if (this.container) {
          this.container.classList.add(`wj-loading-smooth-remove`)
        }
        setTimeout(() => {
          try {
            if (this.container) {
              this.container.remove()
              this.container.classList.remove(`wj-loading-smooth-remove`)
            }
            if (this.element.classList.contains(`wj-loading-relative`)) {
              this.element.classList.remove(`wj-loading-relative`)
            }
            this.element.classList.remove(`wj-loading-lock`)
            this.rendered = false
            this.#supportChangeObject.afterRemove && this.#supportChangeObject.afterRemove()
            resolve()
          } catch (e) {
            reject(e)
          }
        }, 200)
      }
      let delay
      if (delayRemove === undefined || delayRemove === null) {
        delay = this.#supportChangeObject.delayRemove || 0
      } else {
        delay = delayRemove
      }
      if (delay > 0) {
        setTimeout(() => {
          r()
        }, delay)
      } else {
        r()
      }
    })
  }
  get [Symbol.toStringTag](){
    return 'Loading'
  }
}
