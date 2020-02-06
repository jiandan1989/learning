/**
 * BaseHashTable
 * loseloseHashCode
 */

const items = Symbol("BaseHashTable");

class BaseHashTable {
  constructor() {
    this[items] = [];
  }

  /** 转换 hash 值 */
  loseloseHashCode(key) {
    let hash = 0;

    for (let index = 0; index < key.length; index++) {
      hash += key.charCodeAt();
    }

    // todo 这里需要了解下如何合理的转换 hash 值 及为什么普遍的使用 37进行取余
    return hash % 37;
  }

  /** 添加元素 */
  put(key, value) {
    this[items][this.loseloseHashCode(key)] = value;
    return this;
  }

  /** 获取指定 key 元素 */
  get(key) {
    return this[items][this.loseloseHashCode(key)];
  }

  /** 移除指定key */
  remove(key) {
    this[items][this.loseloseHashCode(key)] = undefined;
    return true;
  }

  /** 获取所有元素 */
  getTable() {
    return this[items];
  }
}

console.log("%c基础实现HashTable Start >>>>", "color: red; font-weight: 600");
const baseHt = new BaseHashTable();
baseHt.put("abc", 1).put("a", "123");

console.log(baseHt.get("abc"));
console.log("%c基础实现HashTable End >>>>", "color: red; font-weight: 600");
