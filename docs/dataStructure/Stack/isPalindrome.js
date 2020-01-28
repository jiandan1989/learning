/**
 * @param str string
 * 不使用栈实现
 */
function isPalindrome(str) {
  if (typeof str !== "string" || (typeof str === "string" && str.length <= 1)) {
    return str;
  }

  const newStr = str.replace(/[^a-zA-Z]/g, "").toLowerCase();
  const comparisonStr = newStr
    .split("")
    .reverse()
    .join("");
  return newStr === comparisonStr;
}

function isPalindromeWithStack(str) {
  if (typeof str !== "string" || (typeof str === "string" && str.length <= 1)) {
    return str;
  }

  const s = new Stack();
  let comparisonStr = "";
  const newStr = str.replace(/[^a-zA-Z]/g, "").toLowerCase();
  for (let index = 0; index < newStr.length; index++) {
    s.push(newStr[index]);
  }

  while (!s.isEmpty()) {
    comparisonStr += s.pop();
  }

  return comparisonStr === newStr;
}

// 测试
const arr = ["dad", "hello", "A man, a plan, a canal: Panama"];

const result = arr.map(item => isPalindrome(item)); // [ true, false, true ]
const result2 = arr.map(item => isPalindromeWithStack(item)); // [ true, false, true ]

console.log(result, result2);
