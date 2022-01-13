import axios from 'axios';

const user = (() => {
  const $sign = document.querySelector('.signUser');

  const makeFormData = formElement =>
    [...new FormData(formElement)].reduce((acc, cur) => {
      const [key, value] = cur;
      acc[key] = value;
      return acc;
    }, {});

  const userSign = async formElement => {
    try {
      const url = formElement.classList.contains('signInForm') ? 'signIn' : 'signUp';
      const res = await axios.post(`http://localhost:8000/auth/${url}`, makeFormData(formElement), {
        withCredentials: true
      });
      if (res.status === 201) {
        alert('로그인 성공!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  $sign.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.matches('form')) userSign(e.target);
  });
})();

export default user;
