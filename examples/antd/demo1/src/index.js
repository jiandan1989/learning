import ReactDOM from 'react-dom';
import './index.less';

import routers from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(routers, document.getElementById('root'));
registerServiceWorker();
