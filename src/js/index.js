import axios from "axios";
import "../scss/style.scss";

const $signInForm = document.getElementById("signInForm");

const signIn = async e => {
  try {
    e.preventDefault();

    const formData = new FormData($signInForm);
    const body = {};

    for (const [key, value] of formData.entries()) {
      body[key] = value;
    }

    const res = await axios.post("http://localhost:8000/users/signIn", body);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

$signInForm.addEventListener("submit", signIn);
