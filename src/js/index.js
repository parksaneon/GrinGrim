import Home from './pages/Home.js';
import Mydrawings from './pages/Mydrawings.js';
import Ranking from './pages/Ranking.js';
import NotFound from './pages/NotFound.js';

const router = async (path, query) => {
  const routes = [
    { path: '/', view: Home },
    { path: '/mydrawings', view: Mydrawings },
    { path: '/ranking', view: Ranking }
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
    document.querySelector('#root').innerHTML = await page.getHtml(query);
  }
};

// 뒤로 가기 할 때 데이터 나오게 하기 위함
window.addEventListener('popstate', e => {
  router(e.state ? e.state.path : '/');
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (!e.target.matches('a')) return;
    e.preventDefault();
    const path = e.target.getAttribute('href').split('?')[0];
    const query = e.target.getAttribute('href').split('?')[1];
    window.history.pushState({ path }, null, path);
    router(path, query);
  });

  router(window.location.pathname, window.location.search.substring(1));
});
