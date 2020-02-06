class LikedNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LikedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  /** 尾部添加节点 */
  append(element) {
    const node = new LikedNode(element);
    let current = this.head;
    /** 如果没有节点, 直接添加 */
    if (!this.head) {
      this.head = node;
    } else {
      /** 如果已经存在节点, 遍历查找最后一个节点 */
      while (current.next) {
        current = current.next;
      }

      /** 循环结束后, current 就是最后的一个节点了 */
      current.next = node;
    }

    this.length++;
    return this;
  }

  /** 任意位置添加节点 */
  insert(position, element) {
    if (position < 0 || position >= this.length) {
      throw new Error("错误");
    }
    const node = new LikedNode(element);
    let index = 0;
    let current = this.head;
    /** 如果 position 为 0 直接添加 */
    if (position === index) {
      node.next = current;
      this.head = node;
    } else {
      /** 保留上一个节点的信息 */
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = node;
      node.next = current;
    }

    this.length++;
  }

  /** 删除指定位置节点 */
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      throw new Error("位置错误");
    }
    let index = 0;
    let current = this.head;
    if (position === index) {
      this.head = current.next;
    } else {
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = current.next;
    }

    this.length--;
    return current;
  }

  /** 删除指定节点 */
  remove(element) {
    const index = this.indexOf(element);
    if (index > -1) {
      return this.removeAt(element);
    }
  }

  /** 查找指定节点位置 */
  indexOf(element) {
    if (!this.length) {
      return -1;
    }
    if (element === this.head.element) {
      return 0;
    } else {
      let index = 0;
      let current = this.head;
      while (current.next) {
        current = current.next;
        index++;
        if (current.element === element) {
          return index;
        }
      }
    }

    return -1;
  }

  /** 获取完整链表 */
  getHead() {
    return this.head;
  }

  /** 获取最后一项节点 */
  lastNode() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    return current;
  }

  /** 是否为空 */
  isEmpty() {
    return this.length === 0;
  }

  /** 获取长度 */
  size() {
    return this.length;
  }
}
