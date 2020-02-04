/**
 * 使用对象形式实现简单版本的 Set 类
 */

function ObjectSet() {
  /** 根据目前约定的规范 */
  const has = Object.prototype.hasOwnProperty;

  /** 只有 NaN不等于自身, 需要额外判断, 对于对象本身添加时 NaN也只是能存在一个 */
  const NaNSymbol = Symbol("NaN");
  const encodeVal = function(value) {
    return value !== value ? NaNSymbol : value;
  };

  /** 定义初始化集合对象 */
  let items = {};
  let length = 0;

  /** 添加元素, 因为使用的是对象, 特性是会直接覆盖掉原来的 key 值 */
  this.add = function(value) {
    if (!this.has(value)) {
      length++;
    }
    items[encodeVal(value)] = value;

    return this;
  };

  /** 删除指定元素 */
  this.delete = function(value) {
    if (this.has(encodeVal(value))) {
      delete items[encodeVal(value)];
      length--;
    }

    return false;
  };

  /** 判断是否存在指定元素 */
  this.has = function(value) {
    if (has.call(items, encodeVal(value))) {
      return true;
    }

    return false;
  };

  /** 返回所有元素的数组形式 */
  this.values = function() {
    const values = [];
    for (const key in items) {
      if (has.call(items, key)) {
        values.push(key);
      }
    }

    return values;
  };

  /** 清空集合 */
  this.clear = function() {
    items = {};
  };

  /** 获取集合长度 */
  this.size = function() {
    return length;
  };

  /** 获取所有元素 */
  this.getItems = function() {
    return items;
  };
}

const s = new ObjectSet();
s.add(1)
  .add(NaN)
  .add(2);

console.log(s.getItems(), s.size(), s.values());
