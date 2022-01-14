import '../scss/style.scss';
import Home from './pages/Home.js';
import Draw from './pages/Draw.js';
import Result from './pages/Result.js';
import NotFound from './pages/NotFound.js';

const router = async path => {
  const routes = [
    { path: '/', view: Home },
    { path: '/draw', view: Draw },
    { path: '/result', view: Result }
  ];

  const pageMatches = routes.map(route => ({
    route,
    isMatch: route.path === path
  }));

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);

  if (!match) {
    match = {
      route: path,
      isMatch: true
    };
    const page = new NotFound();
    document.querySelector('#root').innerHTML = await page.getHtml();
  } else {
    const page = new match.route.view();
    document.querySelector('#root').innerHTML = await page.getHtml();
  }
};

window.addEventListener('popstate', e => {
  router(e.state ? e.state.path : '/');
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (!e.target.matches('a')) return;
    e.preventDefault();
    const path = e.target.getAttribute('href');
    window.history.pushState({ path }, null, path);
    router(path);
  });
  router(window.location.pathname);
});
