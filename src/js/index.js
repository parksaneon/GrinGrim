import '../index.html';
import '../scss/style.scss';

import render from './router.js';

const $root = document.getElementById('root');

window.addEventListener('popstate', e => {
  render($root, e.state ? e.state.path : '/');
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (!e.target.matches('a')) return;
    e.preventDefault();
    const path = e.target.getAttribute('href').split('?')[0];
    const query = e.target.getAttribute('href').split('?')[1];
    window.history.pushState({ path }, null, `${path}${query ? '?' + query : ''}`);
    render($root, path, query);
  });

  render($root, window.location.pathname, window.location.search.substring(1));
});
