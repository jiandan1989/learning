const _table = Symbol("hashTableX");

class HashTableX {
  constructor() {
    this[_table] = [];
  }

  /** 插入节点元素 */
  put(key, value) {
    const pos = loseloseHashCode(key);
    const hashNode = new HashNode(key, value);
    if (this[_table][pos] === undefined) {
      this[_table][pos] = hashNode;
    } else {
      let index = pos + 1;
      while (this[_table][index] !== undefined) {
        index++;
      }

      this[_table][index] = hashNode;
    }

    return this;
  }

  /** 获取节点元素, 有值返回, 无值返回 undefined */
  get(key) {
    const pos = loseloseHashCode(key);
    if (this[_table][pos]) {
      if (this[_table][pos].key === key) {
        return this[_table][pos].value;
      } else {
        let index = pos + 1;
        while (
          this[_table][index] !== undefined ||
          this[_table][index].key !== key
        ) {
          index++;
        }

        return this[_table][index].value;
      }
    }

    return undefined;
  }

  /** 删除指定节点元素, 成功 true, 失败false */
  remove(key) {
    const pos = loseloseHashCode(key);

    if (this[_table][pos]) {
      if (this[_table][pos].key === key) {
        this[_table][pos] = undefined;
        return true;
      } else {
        let index = pos + 1;

        while (
          this[_table][index] !== undefined ||
          this[_table][index].key !== key
        ) {
          index++;
        }

        if (this[_table][index].key === key) {
          this[_table][index] = undefined;
          return true;
        }
      }
    }

    return false;
  }

  getTable() {
    return this[_table];
  }
}
