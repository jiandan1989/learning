/** 转换 hash 值 */
function loseloseHashCode(key) {
  let hash = 0;

  for (let index = 0; index < key.length; index++) {
    hash += key[index].charCodeAt();
  }
  // todo 这里需要了解下如何合理的转换 hash 值 及为什么普遍的使用 37进行取余
  return hash % 37;
}
