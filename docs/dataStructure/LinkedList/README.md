# 链表 {docsify-ignore}

> 链表是一种常见的基础数据机构是一种线性表, 但是并不会按照线性的顺醋存储数据, 而是每一个节点里存到下一个节点的指针, 由于不必须按顺序存储, 链表在插入的时候可以达到`O(1)`的复杂度

> 使用链表结构可以克服数据链表需要预先知道数据大小的缺点, 链表结构可以充分利用计算机内存空间, 实现灵活的内存动态管理, 但是链表失去了数组随机读取的有点, 同时链表由于增加了节点的指针域, 空间开销比较大

## 功能

| 方法及属性 | 描述                        |
| ---------- | --------------------------- |
| `insert`   | 插入元素`position, element` |
| `append`   | 向链表尾部添加元素          |
| `indexOf`  | 查找指定元素的位置          |
| `remove`   | 移除指定元素                |
| `removeAt` | 移除指定位置的元素          |
| `size`     | 链表长度                    |
| `isEmpty`  | 链表是否为空                |

### 单链链表

[](SinglyList.js ' :include :type=code')

### 双向链表

> 双向链表和单向链表的功能一样, 但是需要考虑的是每一个节点都包含有上一个(`previous`)节点 和下一个节点(`next`)的信息

[](DoublyList.js ' :include :type=code')


todo: 循环链表, 双向循环列表
<!-- ### 循环链表

### 块状链表 -->


## 参考

- [Data Structures With JavaScript: Singly-Linked List and Doubly-Linked List](https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392)
