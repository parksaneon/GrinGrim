import axios from 'axios';

const user = (() => {
  const $body = document.querySelector('body');
  const $main = document.querySelector('.main');
  const $sign = document.querySelector('.signUser');
  let timer = null;
  let doingNow = null;

  const userSignUp = {
    isValidId: false,
    isValidPwd: false
  };

  const toggleModal = () => {
    doingNow = null;
    $body.classList.toggle('open--modal');
    $sign.innerHTML = '';
  };

  const renderSignIn = () => {
    $sign.innerHTML = `
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
    $sign.innerHTML = `
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
        <label for="userImage">이미지를 드래그 하세요</label>
          <input type="file" id="userImage" name="userImage" required value=""/>
        </div>
        <button type="submit">회원가입</button>
      </form>
    `;
  };

  // const makeFormData = formElement =>
  //   [...new FormData(formElement)].reduce((acc, cur) => {
  //     const [key, value] = cur;
  //     acc[key] = value;
  //     return acc;
  //   }, {});

  const signIn = async formElement => {
    try {
      const res = await axios.post('http://localhost:8000/auth/signIn', new FormData(formElement), {
        withCredentials: true
      });
      if (res.status === 201) {
        history.pushState({ data: 'some data' }, '로그인 성공', '/');
      }
    } catch (error) {
      console.error(error);
      alert('아이디 혹은 비밀번호가 일치하지 않습니다!');
    }
  };

  const signUp = async formElement => {
    try {
      const res = await axios.post('http://localhost:8000/auth/signUp', new FormData(formElement));
      if (res.status === 201) {
        history.pushState({ data: 'some data' }, '회원가입 성공', '/');
      }
      toggleModal();
    } catch (error) {
      console.error(error);
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
    clearTimeout(timer);

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
    if (input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const showImage = document.createElement('img');
        showImage.setAttribute('src', e.target.result);
        document.querySelector('.upload-box').appendChild(showImage);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $body.addEventListener('click', e => {
    if (e.target.matches('.open--modal')) toggleModal();
  });

  $main.addEventListener('click', e => {
    e.preventDefault();
    if (!e.target.matches('.open--signForm')) return;

    toggleModal();

    if (e.target.classList.contains('signIn--open')) {
      doingNow = 'signIn';
      renderSignIn();
    } else {
      doingNow = 'signUp';
      renderSignUp();
    }
  });

  $sign.addEventListener('keyup', ({ target }) => {
    if (doingNow === 'signUp' && target.matches('#userId')) checkValidId(target.value);
    if (doingNow === 'signUp' && target.matches('#password')) checkValidPwd(target.value);
  });

  $sign.addEventListener('submit', e => {
    e.preventDefault();
    if (doingNow === 'signIn') signIn(e.target);
    else if (doingNow === 'signUp') signUp(e.target);
  });

  $sign.addEventListener('click', e => {
    if (e.target.matches('.close--modal')) toggleModal();
  });

  $sign.addEventListener('change', e => {
    if (!e.target.matches('#userImage')) return;
    showDropImage(e.target);
  });
})();

export default user;
