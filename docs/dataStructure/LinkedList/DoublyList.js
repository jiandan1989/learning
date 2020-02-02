class Node {
  constructor(element) {
    this.element = element;
    this.previous = null;
    this.next = null;
  }
}

class DoublyList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /** 添加节点 */
  append(element) {
    const node = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }

    this.length++;
  }

  /** 指定位置添加节点 */
  insert(position, element) {
    if (position < 0 || position > this.length) {
      throw new Error(
        `The insert position must be than zero and less ${this.length}`
      );
    }

    const node = new Node(element);
    let current = this.head;
    /** 这里比较绕, 如果向头部添加节点, 保存原来的头部节点信息 */
    if (position === 0) {
      current.previous = node;
      node.next = current;
      this.head = node;
    } else {
      /** 循环查找, 当 循环查找到对应的位置, 保存上一个节点 和下一个节点, 依次对应添加到 node */
      let index = 0;
      let previous = null;
      let current = this.head;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = node;
      // current.previous = node;
      node.previous = previous;
      node.next = current;
    }

    this.length++;
  }

  /** 删除指定位置节点 */
  // todo 未完成
  removeAt(position) {
    if (position < 0 || position > this.length) {
      throw new Error("删除指定位置不存在");
    }
    let current = this.head;
    if (position === 0 && this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    if (position > 0 && this.length > 1) {
      let index = 0;
      let previous = this.head;
      let current = this.head;

      while (index < position) {
        current = current.next;
        previous = current.previous;
        index++;
      }
      previous.next = current.next;
      current.previous = previous.previous;
    }

    this.length--;
    return current;
  }

  /** 删除指定节点 */
  remove(element) {}

  /** 查找指定节点位置 */
  indexOf(element) {
    if (element === this.head.element) {
      return 0;
    }

    if (element === this.tail.element) {
      return this.length - 1;
    }

    let index = 0;
    let current = this.head;
    /** 也可以使用 this.tail来进行判断, 到底是正向查找好呢, 还是反向查找好呢 ? */
    while (current.next) {
      current = current.next;
      index++;
      if (current.element === element) {
        return index;
      }
      // todo 需要返回查找不到时的 -1
    }
  }

  /** 获取链表总长度 */
  size() {
    return this.length;
  }

  /** 链表是否为空 */
  isEmpty() {
    return this.length === 0;
  }

  /** 获取链表头部节点 */
  getHead() {
    return this.head;
  }

  /** 链表最后一个节点 */
  lastNode() {
    return this.tail;
  }
}
