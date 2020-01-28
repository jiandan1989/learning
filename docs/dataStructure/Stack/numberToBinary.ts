/**
 * 基于以上的栈实现代码
 */
function numberToBinary(num) {
  let result = "";
  const s = new Stack();

  while (num > 0) {
    s.push(num % 2);
    num = Math.floor(num / 2);
  }

  // 不确定有多少元素
  while (!s.isEmpty()) {
    result += s.pop();
  }

  return result;
}
