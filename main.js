import {
  usernameInput,
  emailInput,
  passwordInput,
  repasswordInput,
  errorMsg,
  errors,
  regexChars,
} from "./function/initial.js";

import setErrorMsg from "./function/setErrorMsg.js";
import checkPassword from "./function/validatePassword.js";
import { trimValue, checkRegex } from "./function/utilitiesFunc.js";
import isValid from "./function/validateForm.js";

usernameInput.addEventListener("input", () => {
  const username = trimValue(usernameInput.value);
  if (!checkRegex(regexChars.specialChar, username)) {
    setErrorMsg("username", "");
    errors.username = "";
  } else {
    setErrorMsg("username", errorMsg.username);
    errors.username = errorMsg.username;
  }
});

emailInput.addEventListener("input", () => {
  const email = trimValue(emailInput.value);
  if (checkRegex(regexChars.email, email)) {
    setErrorMsg("email", "");
    errors.email = "";
  } else {
    setErrorMsg("email", errorMsg.email);
    errors.email = errorMsg.email;
  }
});

passwordInput.addEventListener("input", () => {
  const password = trimValue(passwordInput.value);
  if (checkPassword(password)) {
    setErrorMsg("password", "");
    errors.password = "";
  } else errors.password = errorMsg.password;
});

repasswordInput.addEventListener("input", () => {
  if (repasswordInput.value === passwordInput.value) {
    setErrorMsg("repassword", "");
    errors.repassword = "";
  } else {
    setErrorMsg("repassword", errorMsg.repassword);
    errors.repassword = errorMsg.repassword;
  }
});

document.getElementById("register-form").addEventListener("submit", () => {
  if (isValid(errors)) {
    const userData = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registration successful!");
    document.getElementById("register-form").reset();
  } else {
    alert("Check and try again!");
  }
});
