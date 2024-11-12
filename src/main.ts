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
  <div class="tag">
    <span data-url="https://github.com/nlbwqmz/wj-loading">github</span>
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

const children = document.querySelectorAll('.tag')[0].children;
for (let i = 0; i < children.length; i++) {
  children[i].addEventListener('click', e => {
    window.open((<HTMLElement>e.target)?.dataset.url)
  })
}


