// es5
function Queue() {
  let items = [];

  // 入队
  this.enqueue = function(element) {
    items.push(element);
  };

  // 出队
  this.dequeue = function() {
    return items.shift();
  };

  // 查看队列头部元素
  this.front = function() {
    return items[0];
  };

  // 查看长度
  this.size = function() {
    return items.length;
  };

  // 清空队列
  this.clear = function() {
    items = [];
  };

  // 查看队列是否为空
  this.isEmpty = function() {
    return items.length === 0;
  };

  // 查看所有元素
  this.getItems = function() {
    return items;
  };
}

// class
class Queue {
  constructor() {
    this.items = [];
  }

  // 入队
  enqueue(element) {
    this.items.push(element);
  }

  // 出队
  dequeue() {
    return this.items.shift();
  }

  // 查看队列头部
  front() {
    return this.items[0];
  }

  // 清空队列
  clear() {
    this.items = [];
  }

  // 查看队列长度
  size() {
    return this.items.length;
  }

  // 查看队列是否为空
  isEmpty() {
    return this.size() === 0;
  }

  // 查看所有元素列表
  getItems() {
    return this.items;
  }
}
