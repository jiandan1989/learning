// 依据编码规范约定
const has = Object.hasOwnProperty;
const _items = Symbol("items"); // 设置为私有变量
const _length = Symbol("length");

class Dictionary {
  constructor() {
    this[_items] = Object.create(null);
    this[_length] = 0;
  }

  /** 添加键值对 */
  set(key, value) {
    this[_items][key] = value;
    this[_length]++;
    return this;
  }

  /** 删除元素 */
  delete(key) {
    if (this.has(key)) {
      delete this[_items][key];
      this[_length]--;
      return true;
    }
    return false;
  }

  /** 检查键是否存在 */
  has(key) {
    return has.call(this[_items], key);
  }

  /** 获取对应的值 */
  get(key) {
    return this[_items][key];
  }

  /** 获取字典中所有 key, value */
  getItems() {
    return this[_items];
  }

  /** 获取字典长度 */
  size() {
    return this[_length];
  }

  /** 清空字典所有项 */
  clear() {
    this[_items] = Object.create(null);
  }
}

const d = new Dictionary();
d.set("price", 1000);
d.clear();
console.log(d);
