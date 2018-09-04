/**
 * @name: getG2Config
 * @param: type 绘图类型
 * @desc: 返回 transform 转换数据模型 配置, 以及绘图函数
 */

const baseConfig = {
  type: 'fold',
  fields: ['Task complete', 'Cards Complete'],
  key: 'type',
  value: 'value',
};

export const baseShape = {
  line: 'smooth',
  point: 'circle',
  area: 'smooth',
};

export const getG2Config = (type, ops = {}) => ({
  basicLine: { ...baseConfig, ...ops },
  basicArea: { ...baseConfig, ...ops },
  stackedArea: { ...baseConfig, ...ops },
  percentageArea: { ...baseConfig, ...ops },
}[type]);

export const getDrawFn = (chart, type, shape = baseShape) => ({
  basicLine() {
    chart.line().position('name*value').color('type').shape(shape.line);
    chart.point().position('name*value').color('type').size(4).shape(shape.point).style({
      stroke: '#fff',
      lineWidth: 1
    });
  },
  basicArea() { chart.area().position('name*value').color('type').shape(shape.area) },
  stackedArea() { chart.area().position('name*value').color('type') },
  percentageArea() { chart.area().position('name*value').color('type') },
}[type]);
