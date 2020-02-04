## 基础 {docsify-ignore}

### 规范

- 书写组件时, 必须是以大写开头定义自定义组件, 否则在解析时会报错, 小写的组件编译解析时会自动认为是一个原生的`HTML`标签


### Q

- $$typeof的区分, 函数组件 和 class 组件在渲染时更新状态时的顺序 ?
- context 是如何挂载到组件上的, 以及在子孙组件中, 如何调用更新 ?
- ConcurrentMode ?
- React.children.map(展开复制多个相同的子组件) 和原生 数组 `map`(不会展开)的区别 ?
- React.children.map 生成的 `key` 如何区分的 ? 以及 内部如何优化性能的(通过一个类似对象池)
- `forwordRef` 如何使用, 返回的是什么 ?


### 其他参考

- [Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) : 封装一个对象, 禁止向对象中添加新的属性
