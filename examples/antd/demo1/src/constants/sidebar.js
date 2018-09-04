/**
 * @name: 配置 sidebar
 */

export default [{
    key: 'Dashboard',
    icon: 'dashboard',
    text: 'Dashboard',
  }, {
    key: 'Editor',
    icon: 'file-markdown',
    text: 'Editor',
  }, {
    key: 'Components',
    icon: 'file-markdown',
    text: 'Components',
    children: [{
      key: '/componets/forms',
      icon: '',
      text: 'Forms'
    }]
  },
  // {
  //   key: 'UserList',
  //   icon: 'user',
  //   text: 'UserList',
  // },
  // {
  //   key: 'PostList',
  //   icon: 'shopping-cart',
  //   text: 'PostList',
  // },
  // {
  //   key: 'Charts',
  //   icon: 'code-o',
  //   text: 'Charts',
  //   children: [{
  //       key: 'Echarts',
  //       icon: 'line-chart',
  //       text: 'Echarts',
  //       // children: [
  //       //   {
  //       //     key: 'Echarts/Line',
  //       //     icon: 'line-chart',
  //       //     text: 'Line',
  //       //   },
  //       // ],
  //     },
  //     {
  //       key: 'HighCharts',
  //       icon: 'line-chart',
  //       text: 'HighCharts',
  //     },
  //   ],
  // },

  // {
  //   key: 'Error',
  //   icon: 'exclamation-circle',
  //   text: 'notFound',
  // },
];
