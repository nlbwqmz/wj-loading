# wj-loading

Loading组件~~~[演示](https://nlbwqmz.github.io/wj-loading-pages/)

## 安装

- `npm install wj-loading`
- `yarn add wj-loading`

## 示例

### HTML

```html
<div id='loading'></div>
```

### JS
```js
import Loading from 'wj-loading'

new Loading.TextLoading({
  element: '#loading',
  background: 'rgba(255, 255, 255, .8)',
  immediate: true
})
```

## 参数

### 公用参数

|     参数名     |      默认值      | 必须 |数据类型 |                     描述                     |
|:-----------:|:-------------:| :-: | :-: |:------------------------------------------:|
|   element   | document.body | 否 | string/HTMLElement/null | 容器节点(若为string，则使用document.querySelector查找) |
|  immediate  |     false     | 否 | boolean |                    立即执行                    |
|  interval   |       -       | 否 | number |                  执行时间（毫秒）                  |
| background  |       -       | 否 | string |                     背景                     |
|   zIndex    |     2000      | 否 | number |                      z-index                      |
| afterRemove |       -       | 否 | （） => void |                   移除后回调                    |

### BounceLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | #333 | 否 | string/number | 颜色 |
| size | 20px | 否 | string | 尺寸 |

### CircleLoaderLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | #F44336 | 否 | string/number | 颜色 |

### CmSpinnerLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | ['#F15E41', '#BAD375', '#26A9E0'] | 否 | 长度为3的数组（string/number） | 颜色 |
| size | 100px | 否 | string | 尺寸 |

### CubesLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | #333 | 否 | string/number | 颜色 |
| size | 20px | 否 | string | 尺寸 |

### MeshLoaderLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | #F44336 | 否 | string/number | 颜色 |

### SquareLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| text | Loading... | 否 | string | 文字 |
| textVisible | 3 | 否 | 1/2/3 | 1: 始终显示 2：始终不显示 3：若一行不能显示则不显示 |
| fontColor | rgba(128, 128, 128, .9) | 否 | string/number | 文字颜色 |
| maxSize | 容器宽高最小值的四分之一 | 否 | number | 最大尺寸 |

### TextLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| text | Loading... | 否 | string | 文字 |
| color | #333 | 否 | string/number | 颜色 |
| size | 16px | 否 | number | 尺寸 |

### TripleSpinnerLoading 参数

| 参数名 | 默认值 | 必须 |数据类型 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| color | ['#FF5722', '#FF9800', '#FFC107'] | 否 | 长度为3的数组（string/number） | 颜色 |
| size | 100px | 否 | number | 尺寸 |

## 方法

### 公用方法
| 方法名 | 描述 |
| :-: | :-: |
| loading | 执行 |
| remove | 移除 |
