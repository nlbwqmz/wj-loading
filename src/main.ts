import Loading from "./index"

const keys = Object.keys(Loading)

const createCard = () => {
  let html = ''
  keys.forEach(item => {
    html += `
      <div class="card">
        <div class="card-header">${item}</div>
        <div class="card-body" id="${item}-loading"></div>
      </div>
    `
  })
  return html
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="title">wj-loading</div>
  <div class="tag-container">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/wj-loading">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/wj-loading">
    <img alt="NPM License" src="https://img.shields.io/npm/l/wj-loading">
  </div>
  <div class="desc">
    <div class="bg">yarn add wj-loading</div>
    <div class="bg">npm install wj-loading</div>
    <div class="bg">&lt;script src="https://cdn.jsdelivr.net/npm/wj-loading@:version/dist/wj-loading.umd.min.js"&gt;&lt;/script&gt;</div>
    <div class="bg">&lt;script src="https://unpkg.com/wj-loading@:version/wj-loading.umd.js"&gt;&lt;/script&gt;</div>
    <div data-url="https://github.com/nlbwqmz/wj-loading" class="url">github</div>
  </div>
  <div class="grid-container">
    ${createCard()}
  </div>
`

function getRandomRGBAColor() {
  const r = Math.floor(Math.random() * 256); // 0 - 255
  const g = Math.floor(Math.random() * 256); // 0 - 255
  const b = Math.floor(Math.random() * 256); // 0 - 255
  const a = (Math.random()).toFixed(2); // 透明度值范围 0-1，保留两位小数
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

keys.forEach(item => {
  if (item !== 'WaveValueLoading') {
    // @ts-ignore
    new Loading[item]({
      element: document.getElementById(`${item}-loading`),
      background: 'rgba(255, 255, 255, .8)',
      immediate: true
    })
  } else {
    let value = 0
    const waveValueLoading = new Loading.WaveValueLoading({
      element: document.getElementById(`${item}-loading`),
      background: 'rgba(255, 255, 255, .8)',
      immediate: true,
      value
    })
    setInterval(() => {
      if (value < 100) {
        value++
      } else {
        value = 0
      }
      waveValueLoading.setValue(value)
    }, 500)
  }

})

const list = document.querySelectorAll('.url');
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', e => {
    window.open((<HTMLElement>e.target)?.dataset.url)
  })
}


