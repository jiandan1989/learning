const items = Symbol("BaseHashTable");

class BaseHashTable {
  constructor() {
    this[items] = [];
  }

  /** 添加元素 */
  put(key, value) {
    this[items][loseloseHashCode(key)] = value;
    return this;
  }

  /** 获取指定 key 元素 */
  get(key) {
    return this[items][loseloseHashCode(key)];
  }

  /** 移除指定key */
  remove(key) {
    this[items][loseloseHashCode(key)] = undefined;
    return true;
  }

  /** 获取所有元素 */
  getTable() {
    return this[items];
  }
}
