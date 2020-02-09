## 那些需要知道的基础知识 {docsify-ignore}

### Static

> 在 `JS`中使用 `class`关键字来作为一个类时, 不想过多的方法暴露给通过 `new` 创建出来的实例上调用, 就可以通过 [static](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static)来进行定义, 可以理解为内部方法, 只能在类上调用, 同样的当使用继承时也将不会将 `static`定义的方法继承到子类

```js
class TreeNode {
  static nodeMessage = "This is a node message"; // 可以理解为私有的
  static getNodeType(type) {
    return `this is a ${type} tree node`;
  }
}
const treeNode = new TreeNode();

// 这里创建的实例是无法获取到 nodeMessage 的
console.log(treeNode.nodeMessage, TreeNode.nodeMessage); // undefind This is a node message
```

> 如以下代码中显示, 当我们定义一个[二叉树](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8F%89%E6%A0%91)节点类时, 继承了原来的 `TreeNode`

```js
class BinaryTreeNode extends TreeNode {
  constructor(value) {
    super(value);
    this.value = value;
    this.left = null;
    this.right = null;
  }
  /** 可以自己定义当前类的一个静态方法且调用父类的静态方法 以此来实现调用到父类的静态方法, 当然也可以挂在到子类的实例上 */
  static getNodeType(type) {
    return super.getNodeType(type);
  }

  /** 通常是没有必要的 */
  getNodeType(type) {
    return BinaryTreeNode.getNodeType(type);
  }
}

const binaryTreeNode = new BinaryTreeNode(1);
binaryTreeNode.getNodeType("111"); // 将会报错, 因为在 子类中是不能够调用 父类的静态方法的
```
