/**
 * 需要同时保存 key 和 value 借助于 Node 辅助类
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/** 设置私有变量的一种方式 */
const _items = Symbol("LinearHashTable");

class LinearHashTable {
  constructor() {
    this[_items] = [];
  }

  /** 转化 hash code */
  loseloseHashCode(key) {
    let hash = 0;
    for (let index = 0; index < key.length; index++) {
      hash += key[index].charCodeAt();
    }
    return hash % 37;
  }

  /** 添加 */
  put(key, value) {
    const pos = this.loseloseHashCode(key);
    const node = new Node(key, value);

    if (!this[_items][pos]) {
      const list = new LikedList();
      this[_items][pos] = list;
      this[_items][pos].append(node);
    } else {
      this[_items][pos].append(node);
    }

    return this;
  }

  /** 获取指定 key */
  get(key) {
    const pos = this.loseloseHashCode(key);
    if (this[_items][pos]) {
      let current = this[_items][pos].getHead();
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;

        /** 如果是最后一项时 */
        if (current.element.key === key) {
          return current.element.value;
        }
      }

      return undefined;
    }
  }

  /** 删除 */
  remove(key) {
    const pos = this.loseloseHashCode(key);
    if (this[_items][pos]) {
      const list = this[_items][pos];
      let current = this[_items][pos].getHead();
      // todo 这里开始报错了, 是链表里边的错
      while (current.next) {
        if (current.element.key === key) {
          /** element is a Node instance  */
          list.remove(current.element);
          return true;
        }

        /** 优化性能, 说明存在过, 不再使用 put 方法进行添加 */
        /** 如何优化的 ? 并没有减少额外的 new 创建过程 */
        if (list.isEmpty()) {
          this[_items][pos] = undefined;
        }

        current = current.next;
      }
    }

    return false;
  }

  /** 获取散列表 */
  getTable() {
    return this[_items];
  }
}

console.log("%c分离链接解决冲突", "color: yellow");

const linearHashTable = new LinearHashTable();

linearHashTable.put("Donnie", "你好").put("Ana", "世界");
console.log(linearHashTable.get("Donnie"));
