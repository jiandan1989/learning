## 散列表 {docsify-ignore}

### 简述

散列表(`Hash Table`) 是根据`key`而直接访问在内存储存位置的数据结构, 它通过计算一个关于健值的函数, 将所需要查询的数据映射到表中一个位置来访问记录, 这加快了查找速度, 这个映射函数称作`散列函数`, 存放记录的数组称作`散列表`

### 功能

| 方法     | 描述                  |
| -------- | --------------------- |
| `put`    | 添加 及 更新 指定元素 |
| `get`    | 获取指定 `key`对应值  |
| `remove` | 删除指定 `key`        |

<!-- | `size`   | 获取所有元素的长度    | -->

### 实现

> 基础实现最简版

[](base.js ' :include :type=code')

- [如何选择哈希函数](https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function)

`注意: 存在的问题, 即便是计算出来的 hash值也会存在重复的现象, 如何解决重复冲突的问题呢`

> 分离链接

[](linearHashTable.js ' :include :type=code')

### 参考

- [维基百科](https://zh.wikipedia.org/wiki/%E5%93%88%E5%B8%8C%E8%A1%A8)
- [线性探查](https://en.wikipedia.org/wiki/Linear_probing)
- [ASCII](https://zh.wikipedia.org/wiki/ASCII)
- [Hash Function](http://www.cse.yorku.ca/~oz/hash.html)
- [class 中设置私有变量的方法](https://www.cnblogs.com/guojbing/p/10990267.html)
