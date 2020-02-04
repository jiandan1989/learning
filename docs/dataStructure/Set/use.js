/** 创建集合对象 */
const s = new Set();

/** 添加简单类型 */
s.add(1)
  .add(2)
  .add(3)
  .add(4); // 此时集合中已经有 4个元素了

/** 特殊的简单类型 */
s.add(NaN).add(NaN); // 根据 SameValueZero的特性, 此时只会有 5个元素
s.add(+0).add(-0); // 同上

/** 添加引用类型 */
const o = { name: "name", age: 100 };

// 因为是引用类型, 虽然看起来是一样的值,但是指向的内存地址不一样, 所以会重复出现两个 { name: 'name', age: 100 }
s.add(o).add({ name: "name", age: 100 });

/** has */
s.has(NaN); // true
s.has(1); // true
s.has(6); // false

/** delete */
s.delete(1); // true
s.delete(10); // false 因为不存在

/** clear */
s.clear();
s.has(1); // 集合为空, 不存在任何元素
