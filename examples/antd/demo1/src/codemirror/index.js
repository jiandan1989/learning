
/**
 * @name: theme
 * @desc: 主题css 引入
 */
import '../../node_modules/codemirror/mode/javascript/javascript';
import '../../node_modules/codemirror/mode/htmlmixed/htmlmixed';

const path = require('path');
const basePath = path.resolve(__dirname, 'theme');
const requireAll = require.context('./theme/', false, /\.css$/);
const allThemeFiles = requireAll.keys();

allThemeFiles.forEach(file => {
  const filePath = path.resolve(basePath, file);
  require(`.${filePath}`);
});


export const allThemes = allThemeFiles.map(item => path.basename(item, '.css'));

