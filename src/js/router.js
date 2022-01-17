import Home from './pages/Home.js';
import Mydrawings from './pages/Mydrawings.js';
import Ranking from './pages/Ranking.js';
import Draw from './pages/draw.js';
// import Result from './pages/result.js';
import NotFound from './pages/NotFound.js';

const routes = [
  { path: '/', component: Home },
  { path: '/mydrawings', component: Mydrawings },
  { path: '/ranking', component: Ranking },
  { path: '/draw', component: Draw }
  // { path: '/result', component: Result }
];

const getComponent = path => routes.find(route => route.path === path).component() || NotFound();

const render = async (el, path, query) => {
  const page = getComponent(path);
  const { data } = await page.getData(query);
  el.innerHTML = page.getHtml(data);
};

export default render;

// const router = async (path, query) => {
//   const pageMatches = routes.map(route => ({
//     route,
//     isMatch: route.path === path
//   }));

//   let match = pageMatches.find(pageMatch => pageMatch.isMatch);

//   if (!match) {
//     match = {
//       route: path,
//       isMatch: true
//     };

//     const page = NotFound();
//     document.querySelector('#root').innerHTML = page.getHtml();
//   } else {
//     // const page = match.route.component();
//     const page = Mydrawings();
//     document.querySelector('#root').innerHTML = await page.getHtml();
//   }
// };
