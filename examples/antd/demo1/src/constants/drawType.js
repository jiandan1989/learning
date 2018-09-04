/**
 * @name: DRAWTYPES
 * @desc: 相同数据不同绘图方式
 */
export default {
  line: {
    label: '折线图',
    shape: {
      line: ['line', 'smooth', 'dot', 'dash', 'spline'],
      point: ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down',
        'hollowCircle', 'hollowSquare', 'hollowBowtie', 'hollowDiamond',
        'hollowHexagon', 'hollowTriangle', 'hollowTriangle-down',
        'cross', 'tick', 'plus', 'hyphen', 'line'
      ]
    },
    children: {
      basicLine: '基础折线图',
    }
  },
  area: {
    label: '面积图',
    shape: {
      area: ['area', 'smooth', 'line', 'smoothLine']
    },
    children: {
      basicArea: '基础面积图',
      stackedArea: '堆叠面积图',
      percentageArea: '百分比堆叠面积图',
    }
  },
}
