// 二叉搜索树
class BSTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const _root = Symbol("BSTreeRoot");
const _findRightOnRightMin = Symbol("_findRightOnRightMin");
class BSTree {
  constructor() {
    this[_root] = null;
    /** 查找当前节点的右侧最大节点 */
    this[_findRightOnRightMin] = function(node) {
      if (node === null) return null;
      let current = node;
      while (current.right) {
        current = current.right;
      }
      return current;
    };
  }

  /** 递归遍历 插入节点 */
  insertNode(oldNode, newNode) {
    if (oldNode.value > newNode.value) {
      /**如果 节点值大于需要插入节点的值, 放左侧 */
      if (oldNode.left === null) {
        // 右侧无值, 直接插入
        oldNode.left = newNode;
      } else {
        this.insertNode(oldNode.left, newNode);
      }
    } else if (oldNode.value < newNode.value) {
      /** 小于插入节点值 放右侧 */
      if (oldNode.right === null) {
        oldNode.right = newNode;
      } else {
        this.insertNode(oldNode.right, newNode);
      }
    } else {
      console.error("已经存在插入值, 不能重复");
    }

    // 如果相等, 返回 false
    return this;
  }

  /** 插入节点元素 */
  insert(value) {
    const bsTreeNode = new BSTreeNode(value);
    if (this[_root] === null) {
      // 如果为空, 直接添加
      this[_root] = bsTreeNode;
      return this;
    } else {
      // 根节点不为空, 遍历查找
      return this.insertNode(this[_root], bsTreeNode);
    }
  }

  // /** 排序 */
  /** 查找指定值的节点元素 */
  find(value) {
    if (this[_root] === null) {
      return null;
    }
    let current = this[_root];
    while (current !== null) {
      if (current.value === value) {
        return current;
      }

      if (current.value > value) {
        current = current.left;
      } else if (current.value < value) {
        current = current.right;
      }
    }

    // 循环结束还未查找到 返回 null
    return null;
  }

  findMinAndMax(type) {
    if (this[_root] === null) {
      return null;
    }
    const direction = type === "min" ? "left" : "right";
    let current = this[_root];
    while (current[direction] !== null) {
      current = current[direction];
    }

    return current.value;
  }
  /** 最小值 */
  findMin() {
    return this.findMinAndMax("min");
  }

  /** 最大值 */
  findMax() {
    return this.findMinAndMax("max");
  }

  /** 删除指定节点 */
  remove(value) {
    this[_root] = this.removeNode(this[_root], value);
    return this;
  }

  removeNode(node, value) {
    /** 如果节点为空 直接返回 */
    if (node === null) return null;

    /** 递归调用查找节点 */
    if (node.value > value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (node.value < value) {
      node.right = this.removeNode(node.right, value);
    } else {
      // 此处打印可以查看已经查找到需要删除的对应节点
      console.log(node, '>>>>>>>>>>>>');

      if (node.left === null && node.right === null) {
        // 叶子节点
        node = null;
        return node;
      } else if (node.left === null && node.right) {
        return node.right;
      } else if (node.left && node.right === null) {
        return node.left;
      } else {
        // 最后是包含两个子节点
        const aux = this[_findRightOnRightMin](node.right); // 查找右侧最小节点
        node.value = aux.value; // 覆盖 删除
        return node;
      }
    }
  }

  getTree() {
    return this[_root];
  }
}
