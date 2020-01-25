// class 实现
class Stack {
  constructor() {
    this.items = [];
  }

  // 栈顶添加元素
  push(element) {
    this.items.push(element);
  }

  // 弹出栈顶元素
  get pop() {
    return this.items.pop();
  }

  // 检查栈顶元素
  get peek() {
    return this.items[this.size - 1];
  }

  // 清空栈
  clear() {
    this.items = [];
  }

  // 获取栈大小
  get size() {
    return this.items.length;
  }

  // 检查栈是否为空
  get isEmpty() {
    return this.size === 0;
  }
}

// 测试

const s = new Stack();

s.push(1);
console.log(s.size, s.isEmpty, s.items);
