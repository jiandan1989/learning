/**
 * 击鼓传花
 * @param nameList
 * @param num
 * @returns {Object}
 * eliminateList: 淘汰的玩家列表
 * winner: 最后的赢家
 */

// todo 这里并没有做任何的防御措施, 比如判断所有玩家的长度是否大于传递的 num 值
// 玩家列表中的长度是否大于1等之类的防御措施未做
function hotPotato(nameList, num) {
  const queue = new Queue();
  const eliminateList = [];

  // 首先将所有的玩家入队
  for (let index = 0; index < nameList.length; index++) {
    queue.enqueue(nameList[index]);
  }

  // 判断如果剩余玩家还有多个时, 一直循环直至剩下最后一名玩家
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      // 未被淘汰的人先出队 后入队
      queue.enqueue(queue.dequeue());
    }

    // 当循环完成后, 依次将淘汰出队的玩家加入到淘汰列表中
    eliminateList.push(queue.dequeue());
  }

  return {
    winner: queue.dequeue(),
    eliminateList
  };
}

// { winner: 'a', eliminateList: [ 'c', 'f', 'd', 'b', 'e' ] }
console.log(hotPotato(["a", "b", "c", "d", "e", "f"], 3));
