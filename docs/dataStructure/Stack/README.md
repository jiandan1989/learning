## 栈 {docsify-ignore}

### 描述

栈(Stack) 又称为堆叠, 是计算机科学中的一种抽象数据类型, 只允许在有序的线性数据集合的一段(称为堆栈顶端`TOP`)机型加入数据(`push`)和移除数据(`pop`)的运算, 因而按照后进先出的原理运作(`LIFO -> Last In First Out`)

栈有两个基本的操作 推入(压栈 `Push`指的是将数据放入栈顶端) 和 弹出(弹栈 `Pop` 指的是将堆栈顶端数据移除), 这里需要理解一下在`JS`中的数组操作 [Push](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 和 [Pop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

- 在这里先引入一张比较通俗易懂的图帮助理解一下, 看起来像是我们平时堆放东西一样,但是有一个规则就是只能按照顺序的放或者拿, 最后放的就在最上边, 拿的时候当然也是最上边的一个 ![](Data_stack.svg)

- ES5 `Function`

[](es5Functin.ts " :include :type=code")

- `class`

[](class.js " :include :type=code")

> 然后需要了解下实现一个栈的哪些功能, 因为这里使用的是 `JS` 数组的内置方法, 所以所以是比较简单的

| 方法及属性 | 描述           |
| ---------- | -------------- |
| `push`     | 栈顶添加元素   |
| `pop`      | 栈顶移除元素   |
| `peek`     | 查看栈顶       |
| `isEmpty`  | 检查栈是否为空 |
| `clear`    | 清空栈         |
| `size`     | 查看栈的长度   |

### 实践

#### 进制转换

#### 回文

#### 递归演示

### 视频

- [栈（Stack）简介 —— 数据结构与算法 javascript 描述](https://www.youtube.com/watch?v=kCE-s22S_N8&list=PL9nxfq1tlKKmgTh_FSRzSIChwOsv7qr7v&index=2&pbjreload=10)
- [栈（Stack）实现](https://www.youtube.com/watch?v=LgLg7leHR9M&list=PL9nxfq1tlKKmgTh_FSRzSIChwOsv7qr7v&index=3)
- [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)
- [Call Stack](https://en.wikipedia.org/wiki/Call_stack)
- [BUFFER OVERFLOW 6 The Function Stack](https://www.tenouk.com/Bufferoverflowc/Bufferoverflow2a.html)
- [Understanding Javascript Function Executions — Call Stack, Event Loop , Tasks & more](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
- [Understanding the JavaScript call stack](https://www.freecodecamp.org/news/understanding-the-javascript-call-stack-861e41ae61d4/)
- [How do you implement a Stack and a Queue in JavaScript?](https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript)
