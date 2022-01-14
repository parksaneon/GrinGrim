import axios from 'axios';

const user = (() => {
  const $body = document.querySelector('body');
  const $main = document.querySelector('.main');
  const $formWrap = document.querySelector('.form--wrap');
  let doingNow = null;

  const userSignUp = {
    isValidId: false,
    isValidPwd: false
  };

  const toggleModal = () => {
    doingNow = null;
    $body.classList.toggle('open--modal');
    $formWrap.innerHTML = '';
  };

  const renderSignIn = () => {
    $formWrap.innerHTML = `
      <button class="close--modal">닫기</button>
      <form method="post" class="signInForm" >
        <div>
          <label for="userId">아이디</label>
          <input type="text" id="userId" name="userId" placeholder="아이디" required />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="비밀번호" required />
        </div>
        <button type="submit">로그인</button>
      </form>
    `;
  };

  const renderSignUp = () => {
    $formWrap.innerHTML = `
      <button class="close--modal">닫기</button>
      <form method="post" class="signUpForm" enctype="multipart/form-data">
        <div>
          <label for="userId">아이디</label>
          <input type="text" id="userId" name="userId" placeholder="아이디" required autocomplete="on"/>
          <span class="id--informText"></span>
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="비밀번호" required autocomplete="on"/>
          <span class="pwd--informText"></span>
        </div>
        <div>
          <label for="nickName">닉네임</label>
          <input type="text" id="nickName" name="nickName" placeholder="닉네임" required autocomplete="on"/>
        </div>
        <div class="upload-box">
        <label for="userImage">이곳을 클릭하거나 이미지를 드래그 하세요</label>
          <input type="file" id="userImage" name="userImage" required value=""/>
          <img src="" alt="" class="showImage"/>
        </div>
        <button type="submit">회원가입</button>
      </form>
    `;
  };

  const sendUserReq = async formData => {
    const res = await axios.post(`http://localhost:8000/auth/${doingNow}`, formData, {
      withCredentials: true
    });
    return res;
  };

  const signIn = async formElement => {
    try {
      const formData = [...new FormData(formElement)].reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      const res = await sendUserReq(formData);
      if (res.status === 201) history.pushState({ data: 'some data' }, '로그인 성공', '/');
      doingNow = null;
    } catch (error) {
      console.error(error);
      alert('아이디 혹은 비밀번호가 일치하지 않습니다!');
    }
  };

  const signUp = async formElement => {
    try {
      const formData = new FormData(formElement);
      const res = await sendUserReq(formData);
      if (res.status === 201) history.pushState({ data: 'some data' }, '회원가입 성공', '/');
      doingNow = null;
    } catch (error) {
      console.error(error);
      alert('회원가입을 실패했습니다.');
    }
  };

  const checkIdRxp = (() => {
    const regExp = /^[a-z0-9]{5,19}$/g;

    return tempId => regExp.test(tempId);
  })();

  const checkValidId = tempId => {
    const idInformText = document.querySelector('.id--informText');

    if (!checkIdRxp(tempId)) {
      idInformText.innerText = '영문자, 숫자로 6~20자로 조합해주세요';
      return;
    }

    let timer = null;
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      try {
        const res = await axios.post(`http://localhost:8000/auth/checkId`, { tempId });
        if (res.status === 201) {
          idInformText.innerText = '사용 가능한 아이디 입니다.';
          userSignUp.isValidId = true;
          idInformText.classList.add('valid');
        }
      } catch (error) {
        console.error(error);
        idInformText.innerText = '중복된 아이디 입니다.';
        userSignUp.isValidId = false;
        idInformText.classList.remove('valid');
      }
    }, 500);
  };

  const checkValidPwd = (() => {
    const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    return tempPwd => {
      const pwdInformText = document.querySelector('.pwd--informText');
      if (regExp.test(tempPwd)) {
        userSignUp.isValidPwd = true;
        pwdInformText.innerText = '사용 가능한 패스워드입니다.';
        pwdInformText.classList.add('valid');
      } else {
        userSignUp.isValidPwd = false;
        pwdInformText.innerText = '8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요.';
        pwdInformText.classList.remove('valid');
      }
    };
  })();

  const showDropImage = input => {
    if (!input.files[0]) return;

    const reader = new FileReader();

    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', ({ target }) => {
      const showImage = document.querySelector('.showImage');
      showImage.setAttribute('src', target.result);
      showImage.classList.add('show');
    });
  };

  $body.addEventListener('click', ({ target }) => {
    if (target.matches('.open--modal')) toggleModal();
  });

  $main.addEventListener('click', e => {
    e.preventDefault();
    if (!e.target.matches('.open--signForm')) return;
    if (!doingNow) toggleModal();

    if (e.target.classList.contains('signIn--open')) {
      doingNow = 'signIn';
      renderSignIn();
    } else {
      doingNow = 'signUp';
      renderSignUp();
    }
  });

  $formWrap.addEventListener('keyup', ({ target }) => {
    if (doingNow === 'signUp' && target.matches('#userId')) checkValidId(target.value);
    if (doingNow === 'signUp' && target.matches('#password')) checkValidPwd(target.value);
  });

  $formWrap.addEventListener('submit', e => {
    e.preventDefault();
    if (doingNow === 'signIn') signIn(e.target);
    else if (doingNow === 'signUp') signUp(e.target);
  });

  // window.addEventListener('keyup', e => {
  //   if (e.key !== 'Enter' || !doingNow) return;
  //   console.log(e.key === 'Enter', !doingNow);
  // });

  $formWrap.addEventListener('click', ({ target }) => {
    if (target.matches('.close--modal')) toggleModal();
  });

  $formWrap.addEventListener('change', ({ target }) => {
    if (target.matches('#userImage')) showDropImage(target);
  });
})();

export default user;
