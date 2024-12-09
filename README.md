# wj-loading

![NPM Version](https://img.shields.io/npm/v/wj-loading)
![NPM Downloads](https://img.shields.io/npm/dw/wj-loading)
![NPM License](https://img.shields.io/npm/l/wj-loading)

**开箱即用的loading组件~~~**

- [演示](https://nlbwqmz.github.io/wj-loading-pages/)
- [github](https://github.com/nlbwqmz/wj-loading)

## vue指令版本兼容vue2和vue3

- [wj-loading-vue](https://github.com/nlbwqmz/wj-loading-vue)

## 安装

***:version**为对应版本号*

- `npm install wj-loading`
- `yarn add wj-loading`
- `<script src="https://cdn.jsdelivr.net/npm/wj-loading@:version/dist/wj-loading.umd.min.js"></script>`
- `<script src="https://unpkg.com/wj-loading@:version/wj-loading.umd.js"></script>`

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

## 公用

### 公用参数

|     参数名      |        默认值         | 必须 | 支持setOption |          数据类型           |                     描述                     |
|:------------:|:------------------:|:--:|:-----------:|:-----------------------:|:------------------------------------------:|
|   element    |   document.body    | 否  |      否      | string/HTMLElement/null | 容器节点(若为string，则使用document.querySelector查找) |
|  immediate   |       false        | 否  |      否      |         boolean         |                    立即执行                    |
|   interval   |         -          | 否  |      是      |         number          |                  执行时间（毫秒）                  |
|  background  | rgba(0, 0, 0, 0.2) | 否  |      是      |         string          |                     背景                     |
|    zIndex    |        2000        | 否  |      是      |         number          |                  z-index                   |
| afterRemove  |         -          | 否  |      是      |       () => void        |                   移除后回调                    |
| delayRemove  |         -          | 否  |      是      |         number          |                  延迟移除（毫秒）                  |
|   tipText    |         -          | 否  |      是      |         string          |                   底部提示文字                   |
| tipTextClass |         -          | 否  |      是      |         string          |                底部提示文字class                 |

### 公用方法

|             方法名             |      必须       |                  参数                   | 描述 |
|:---------------------------:|:-------------:|:-------------------------------------:|:--:|
|  loading(interval: number)  |  interval:否   |          interval:执行时时间（毫秒）           | 执行 |
| remove(delayRemove: number) | delayRemove:否 |         delayRemove:延迟移除（毫秒）          | 移除 |
|      setOption(option)      |    设置参数:是     | option:请查看公用参数和动画对应的参数是否支持setOption方法 | 设置 |

## BounceLoading

### 参数

|  参数名  | 默认值  | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:----:|:--:|:-----------:|:------:|:--:|
| color | #333 | 否  |      是      | string | 颜色 |
| size  | 20px | 否  |      是      | string | 尺寸 |

## CircleLoaderLoading

### 参数

|  参数名  |   默认值   | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:-------:|:--:|:-----------:|:------:|:--:|
| color | #F44336 | 否  |      是      | string | 颜色 |

## CmSpinnerLoading

### 参数

|  参数名  |                默认值                | 必须 | 支持setOption |      数据类型       | 描述 |
|:-----:|:---------------------------------:|:--:|:-----------:|:---------------:|:--:|
| color | ['#F15E41', '#BAD375', '#26A9E0'] | 否  |      是      | 长度为3的数组（string） | 颜色 |
| size  |               100px               | 否  |      是      |     string      | 尺寸 |

## CubesLoading

### 参数

|  参数名  | 默认值  | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:----:|:--:|:-----------:|:------:|:--:|
| color | #333 | 否  |      是      | string | 颜色 |
| size  | 20px | 否  |      是      | string | 尺寸 |

## MeshLoaderLoading

***不支持tipText、tipTextClass***

### 参数

|  参数名  |   默认值   | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:-------:|:--:|:-----------:|:------:|:--:|
| color | #F44336 | 否  |      是      | string | 颜色 |

## TextLoading

### 参数

|  参数名  |    默认值     | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:----------:|:--:|:-----------:|:------:|:--:|
| text  | Loading... | 否  |      是      | string | 文字 |
| color |    #333    | 否  |      是      | string | 颜色 |
| size  |    16px    | 否  |      是      | number | 尺寸 |

## TripleSpinnerLoading

### 参数

|  参数名  |                默认值                | 必须 | 支持setOption |      数据类型       | 描述 |
|:-----:|:---------------------------------:|:--:|:-----------:|:---------------:|:--:|
| color | ['#FF5722', '#FF9800', '#FFC107'] | 否  |      是      | 长度为3的数组（string） | 颜色 |
| size  |               100px               | 否  |      是      |     number      | 尺寸 |

## DotJumpLoading

### 参数

|  参数名  |       默认值        | 必须 | 支持setOption |      数据类型       | 描述 |
|:-----:|:----------------:|:--:|:-----------:|:---------------:|:--:|
| color | ['#000', '#000'] | 否  |      是      | 长度为2的数组（string） | 颜色 |

## JellyLoading

### 参数

|      参数名      | 默认值  | 必须 | 支持setOption |  数据类型  |  描述   |
|:-------------:|:----:|:--:|:-----------:|:------:|:-----:|
|     color     | #fff | 否  |      是      | string |  颜色   |
|  shadowColor  | #000 | 否  |      是      | string | 阴影颜色  |
| shadowOpacity | 0.1  | 否  |      是      | string | 阴影透明度 |

## WaveLoading

***不支持tipText、tipTextClass***

### 参数

|  参数名  | 默认值  | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:----:|:--:|:-----------:|:------:|:--:|
| color | #000 | 否  |      是      | string | 颜色 |

## DotExpandLoading

### 参数

|  参数名  | 默认值  | 必须 | 支持setOption |  数据类型  | 描述 |
|:-----:|:----:|:--:|:-----------:|:------:|:--:|
| color | #000 | 否  |      是      | string | 颜色 |

## WaveValueLoading

### 参数

|     参数名     |   默认值   | 必须 | 支持setOption |  数据类型  |     描述     |
|:-----------:|:-------:|:--:|:-----------:|:------:|:----------:|
|    color    | #76DAFF | 否  |      是      | string |     颜色     |
|    size     |   100   | 否  |      是      | number |     尺寸     |
|    value    |    0    | 否  |      是      | number | 进度值(0-100) |
|  fontSize   |  20px   | 否  |      是      | string |    字体大小    |
|  fontColor  |  #000   | 否  |      是      | string |    字体颜色    |
| fontWeight  | normal  | 否  |      是      | string |    字体粗细    |
| borderSize  |    2    | 否  |      是      | string |    边框尺寸    |
| paddingSize |    2    | 否  |      是      | string |    空隙尺寸    |

### 方法

|           方法名           |   必须    |        参数        |  描述   |
|:-----------------------:|:-------:|:----------------:|:-----:|
| setValue(value: number) | value:否 | value:进度值(0-100) | 设置进度值 |

## TextFillLoading

### 参数

|    参数名    |   默认值    | 必须 | 支持setOption |  数据类型  |            描述             |
|:---------:|:--------:|:--:|:-----------:|:------:|:-------------------------:|
|   color   |   #FFF   | 否  |      是      | string |           文字颜色            |
| fillColor | #76DAFF  | 否  |      是      | string |           填充颜色            |
|   size    |   40px   | 否  |      是      | string |           文字大小            |
| direction | vertical | 否  |      是      | string | 方向(horizontal / vertical) |

