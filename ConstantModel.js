class ConstantModel {
  constructor(name, model) {
    this.name = name;
    this.model = model;
  }
  getValue(key) {
    return key ? this.model[this.getKeys().filter(el =>
    (el === key || el === key.toLowerCase() || el === key.toUpperCase()))] : null;
  }
  getKeys() {
    return Object.keys(this.model);
  }
  getModel() {
    return this.model;
  }
}

export default ConstantModel;
