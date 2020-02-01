function PriorityQueue() {
  let items = [];

  // 借助一个辅助类, 这里只实现优先级按照正常思维排序 9 > 1, 数字越大优先级越高
  // element: 需要入队的元素, prioriy: 入队元素的优先级
  function EnqueueElement(element, priority = 0) {
    this.element = element;
    this.priority = priority;
  }

  // 入队
  this.enqueue = function(element, priority) {
    const queueElement = new EnqueueElement(element, priority);
    // 首先判断是否为空, 若为空可直接添加
    if (this.isEmpty()) {
      items.push(queueElement);
    } else {
      // 如果不为空, 这里设置为优先级越大的放在最前, 利用 splice 方法进行替换
      var added = false;
      for (let i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      // 当执行完循环后, 如果都不匹配的话, 说明这次的优先级最高直接放入队列末尾
      if (!added) {
        items.push(queueElement);
      }
    }
  };

  // 出队
  this.dequeue = function() {
    return items.shift();
  };

  // 队列是否为空
  this.isEmpty = function() {
    return this.size() === 0;
  };

  // 队列大小
  this.size = function() {
    return items.length;
  };

  // 查看队列首位
  this.front = function() {
    return items[0];
  };

  // 清空队列
  this.clear = function() {
    items = [];
  };

  // 查看所有元素
  this.getItems = function() {
    return items;
  };
}

/**
 * 测试
 * const queue = new PriorityQueue();
 * queue.enqueue(1, 1);
 * queue.enqueue(2, 2);
 * queue.enqueue(3, 3);
 * queue.enqueue(3, 4);
 * console.log(queue.getItems());
 * [
  EnqueueElement { element: 1, priority: 1 },
  EnqueueElement { element: 2, priority: 2 },
  EnqueueElement { element: 3, priority: 3 },
  EnqueueElement { element: 3, priority: 4 }
]
 */
