// 二叉搜索树
class BSTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const _root = Symbol("BSTreeRoot");
class BSTree {
  constructor() {
    this[_root] = null;
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
    if (this[_root] === null) {
      console.log("当前树为空, 不能进行删除!");
      return false;
    }

    return this.removeNode(this[_root], value);
  }

  removeNode(oldNode, value) {
    if (oldNode.value === value) {
      if (oldNode.left === null && oldNode.right === null) {
        oldNode = null;
        return true;
      }

      // let dir;
      // if (oldNode.left === null && oldNode.right !== null) {
      //   dir = "left";
      // } else if (oldNode.right === null && oldNode.left !== null) {
      //   dir = "right";
      // }

      console.log(dir);
    } else if (oldNode.value > value) {
      console.log('左侧');
      return this.removeNode(oldNode.left, value);
    } else if (oldNode.value < value) {
      console.log("右侧");
      return this.removeNode(oldNode.right, value);
    }
  }

  getTree() {
    return this[_root];
  }
}
