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
  <div class="desc">
    <div class="bg">yarn add wj-loading</div>
    <div class="bg">npm install wj-loading</div>
    <div data-url="https://github.com/nlbwqmz/wj-loading" class="url">github</div>
  </div>
  <div class="grid-container">
    ${createCard()}
  </div>
`

keys.forEach(item => {
  // @ts-ignore
  new Loading[item]({
    element: document.getElementById(`${item}-loading`),
    background: 'rgba(255, 255, 255, .8)',
    immediate: true
  })
})

const list = document.querySelectorAll('.url');
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', e => {
    window.open((<HTMLElement>e.target)?.dataset.url)
  })
}


