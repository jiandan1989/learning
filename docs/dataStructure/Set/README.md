## 集合 Set {docsify-ignore}

> 在[ES6]()的定义中, 使用的是[SameValueZero](https://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero)的比较算法来进行比较的, 一下是几种比较特殊的值

- [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
- `0 和 -0`: 无论是 `x = -0 y = +0` 或者 `x = +0 y = -0`都会返回`true`

### 功能

| 方法及属性                                                                                                  | 描述                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [size](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/size)           | 集合的长度                                                                                                            |
| [add](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/add)             | 添加元素到集合中                                                                                                      |
| [has](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/has)             | 判断集合中是否有指定元素                                                                                              |
| [delete](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)       | 删除结合中指定元素, 删除成功后返回 `true`, 否则返回 `false`                                                           |
| [clear](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)         | 清空集合                                                                                                              |
| [forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)     | 按照插入元素的顺序进行遍历, 可接受一个回调函数依次执行                                                                |
| [values](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/values)       | 按照原 `Set`对象中插入元素顺序返回所有元素                                                                            |
| [iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator) | The initial value of the @@iterator property is the same function object as the initial value of the values property. |
| [entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/entries)     | 返回一个以 `[key, value]`形式的数组迭代器对象                                                                         |

### 使用

> 判断是否为 `Set` 对象

```js
Object.prototype.toString.call(new Set()); // [object set]
```

#### 普通使用

[](use.js ' :include :type=code')

#### 转换使用

[更多查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

[](transform.js ' :include :type=code')

### 参考

- [维基百科](<https://zh.wikipedia.org/wiki/%E9%9B%86%E5%90%88_(%E6%95%B0%E5%AD%A6)>)
- [ECMA 标准](https://www.ecma-international.org/ecma-262/6.0/#sec-set-objects)
- [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/set-map#Set)
- [hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
- [pollfill set 实现](https://github.com/mqyqingfeng/Blog/blob/master/demos/qunit/polyfill-set.js)
