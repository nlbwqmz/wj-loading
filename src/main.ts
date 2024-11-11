import Loading from "./index";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="width: 100%; height: 500px; background: aqua; display: flex; justify-content: center; align-items: center">
    <div style="width: 200px; height: 200px; border: 1px red solid; overflow: scroll" id="test-div">
      <div>test1</div>
      <div>test2</div>
      <div>test3</div>
      <div>test4</div>
      <div>test5</div>
      <div>test6</div>
      <div>test7</div>
      <div>test</div>
      <div>testtesttesttesttesttesttesttesttesttesttest</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>testtesttesttesttesttesttesttesttesttest</div>
    </div>
  </div>
`

const loading = new Loading.BounceLoading({
  immediate: true,
  element: document.getElementById('test-div'),
  background: 'rgba(0, 0, 0, .8)',
  color: 'red',
  // size: '50px'
});
