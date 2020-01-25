var Stack = function() {
  // 使用私有变量, 禁止外部手动修改
  let items = [];

  // 栈顶添加元素
  this.push = function(element) {
    items.push(element);
  };

  // 弹出栈顶元素
  this.pop = function() {
    return items.pop();
  };

  // 检查栈顶
  this.peek = function() {
    return items[this.size() - 1];
  };

  // 查看栈大小
  this.size = function() {
    return items.length;
  };

  // 清空栈
  this.clear = function() {
    items = [];
  };

  // 查看栈是否为空
  this.isEmpty = function() {
    return this.size() === 0;
  };

  // 获取栈所有元素
  this.getItems = function() {
    return items;
  };
};
