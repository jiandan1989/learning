## 理解 apply / call / bind 之间的区别 {docsify-ignore}

### bind

[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

> `bind`方法其实是创建了一个绑定函数的`副本(称之为包装函数)`, 在调用函数时, `this`的指向为 `bind`的第一个参数, 但是也会有使用错误的情况, 这就涉及到了 `this`指向问题. 想要真正弄懂`执行上下文 this 的指向问题` 其实需要明白最终调用函数的是谁 ?

