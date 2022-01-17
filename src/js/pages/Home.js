export default () => ({
  getData() {
    return { data: null };
  },

  getHtml() {
    return `
    <h1 class="logo">
      <img src="./img/title.svg" alt=""/>
    </h1>
    <main class="main">
      <div class="left--section">
        <img src="./img/art1.svg" alt="" /><button class="open--signForm signIn--open">로그인</button>
      </div>
      <div class="right--section">
        <img src="img/art2.svg" alt="" /><button class="open--signForm signUp--open">회원가입</button>
      </div>
      <div class="left--section">
        <img src="./img/art1.svg" alt="" /><a href="/mydrawings">내 그림</a>
      </div>
      <div class="right--section">
        <img src="img/art2.svg" alt="" /><a href="/ranking">랭킹</a>
      </div>
      <div class="right--section">
        <img src="img/art2.svg" alt="" /><a href="/draw">그림 그리기</a>
      </div>
    </main>
    <div class="form--wrap"></div>
      `;
  },

  eventBinding() {
    return null;
  }
});
//   return `
// <h1 class="logo">
// <img src="/src/img/title.svg" alt="" />
// </h1>
// <main class="main">
//   <div class="left--section">
//     <img src="img/art1.svg" alt="" /><button class="open--signForm signIn--open">로그인</button>
//   </div>
//   <div class="right--section">
//     <img src="img/art2.svg" alt="" /><button class="open--signForm signUp--open">회원가입</button>
//   </div>
// </main>
// <div class="form--wrap"></div>
//   `;
// <a href='/mydrawings'>My drawings</a>
// <a href='/ranking'>Ranking</a>
// <a href='/draw'>Draw</a>
// <a href='/result'>Result</a>
