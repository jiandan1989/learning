/**
 * @param: 一组包含男性和女性的所有舞者的列表
 * @returns {Object}
 * lastDancers: [{ name: '', sex: '' }];
 * dancers: [{ F: '女性名称', M: '男性名称' }]
 * femaleDancers: 女性舞者列表
 * maleDancers: 男性舞者列表
 */
// todo 最后未能匹配到的舞者名称和性别列表, 需要查找是否有差集

function squareDance(nameList) {
  const femaleDancers = new Queue();
  const maleDancers = new Queue();
  const dancers = new Queue();

  // 借助一个辅助类, 返回包含有名称和性别的对象, 传入的是一个包含性别和名称的字符串
  // todo 不适用辅助类也可以, 但为了以后习惯性的封装一些简单的辅助类和后续的结构学习
  function Dancer(name, sex) {
    this.name = name;
    this.sex = sex;
  }

  for (let i = 0; i < nameList.length; i++) {
    const newName = nameList[i].trim();
    const index = newName.indexOf(" ");
    const sex = newName.substring(0, index);
    const name = newName.substring(index).trim();

    const dancer = new Dancer(name, sex);
    if (sex === "F") {
      femaleDancers.enqueue(dancer);
    } else {
      maleDancers.enqueue(dancer);
    }
  }

  const femaleDancerLength = femaleDancers.size();
  const maleDancerLength = maleDancers.size();
  const list =
    femaleDancerLength >= maleDancerLength
      ? maleDancers.getItems()
      : femaleDancers.getItems();

  // 可以不使用队列, 可能更简洁点
  for (let j = 0; j < list.length; j++) {
    dancers.enqueue({
      F: femaleDancers.getItems()[j].name,
      M: maleDancers.getItems()[j].name
    });
  }

  return {
    femaleDancers: femaleDancers.getItems(),
    maleDancers: maleDancers.getItems(),
    dancers: dancers.getItems()
  };
}

// 所有舞者列表
const nameList = [
  "F Allison McMillan",
  "M Frank Opitz",
  "M Mason McMillan",
  "M Clayton Ruff",
  "F Cheryl Ferenback",
  "M Raymond Williams",
  "F Jennifer Ingram",
  "M Bryan Frazer",
  "M David Durr",
  "M Danny Martin",
  "F Aurora Adney"
];

console.log(squareDance(nameList));
