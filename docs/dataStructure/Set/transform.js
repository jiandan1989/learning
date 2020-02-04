/** 通过 set key值的唯一性, 用于去重 */
const arr = [1, 2, 3, 4, 5, 1, 2];
new Set(arr); // { 1, 2, 3, 4, 5 }

/** 转换为数组, 当然也可以使用遍历的形式 */
[...new Set(arr)]; // [1, 2, 3, 4, 5]
Array.from(new Set(arr));

/** 字符串也可以进行去重 */
const str = "abcabc";
[...new Set(str)].join(""); // abc
