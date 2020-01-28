/**
 *
 * @param number 需要转换的数字
 * @param base 转换进制的基数, 这里只能是 小于等于10, 大于10之后的为字母
 */

function numberToBase(number, base = 2) {
  if (base < 2 || base > 10) return number;
  let result = "";
  const s = new Stack();
  while (number > 0) {
    s.push(number % base);
    number = Math.floor(number / base);
  }

  while (!s.isEmpty()) {
    result += s.pop();
  }

  return result;
}
