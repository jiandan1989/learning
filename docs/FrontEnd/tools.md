## 需要懂的小工具 {docsify-ignore}

### 防抖 And 节流

#### 防抖

> 通俗点说就是在执行一个请求或者更新`DOM`元素的内容时, 短时间内频繁的更新导致性能不好容易出现类似抖动的体验, 为了防止或者可以说是优化性能时, 提出了一种防抖的技术, 约定在规定时间内的所有事件执行都将会变成一次执行

```js
function debounce(fn, delay) {
  let timer = null;

  return function debounceHandler() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```

#### 节流

> 而节流同样也是为了性能优化提出来的一种优化方法, 假设是`mousemove`事件来说的话, 不能像防抖那样过于优化, 需要有一定频率的进行更新, 假设设置背景图片的`position`修改, 使用防抖的话移动鼠标触发 `mousemove`事件后设置为`500ms`的话还是会出现一种抖动的感觉, 假设我们约定 `500ms`内执行 10 次话, 将节流的时间间隔设置为 `50ms`就可以, 有点类似于`setInterval`的执行

- [Throttling and Debouncing in JavaScript](https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf)
- [Demo](http://demo.nimius.net/debounce_throttle/)

### 参考
