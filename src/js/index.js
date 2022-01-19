import '../index.html';
import '../scss/style.scss';

import router from './router.js';

const $root = document.getElementById('root');

window.addEventListener('popstate', e => {
  router($root, window.location.pathname, window.location.search.substring(1));
});

router($root, window.location.pathname, window.location.search.substring(1));
