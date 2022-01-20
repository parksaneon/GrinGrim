import Home from './pages/Home.js';
import Mydrawings from './pages/Mydrawings.js';
import Ranking from './pages/Ranking.js';
import Draw from './pages/Draw.js';
import Result from './pages/Result.js';
import NotFound from './pages/NotFound.js';
import Unauthorized from './pages/Unauthorized.js';

const routes = [
  { path: '/', component: Home },
  { path: '/mydrawings', component: Mydrawings },
  { path: '/ranking', component: Ranking },
  { path: '/draw', component: Draw },
  { path: '/result', component: Result },
  { path: '***', component: Unauthorized },
  { path: '**', component: NotFound }
];

const getComponent = path =>
  (routes.find(route => route.path === path) || routes.find(route => route.path === '**')).component();

const render = async (el, path, query) => {
  const page = getComponent(path);
  const { data } = await page.getData(query);
  el.innerHTML = page.getHtml(data);
  page.eventBinding(el);
};

export default render;
