const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");

const regexChars = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  digit: /[0-9]/,
  specialChar: /[!@#$%^&*()_\-+=,.?]/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  space: /\s/,
};

const errors = {
  username: "",
  email: "",
  password: "",
  repassword: "",
};

const isValid = (errors) => {
  for (key in errors) {
    if (errors[key] !== "") return false;
  }
  return true;
};

const errorMsg = {
  username: "Username must not contain special characters",
  email: "Invalid email format",
  password: {
    length: "Password must be at least 8 characters",
    uppercase: "Password must contain one uppercase letter",
    lowercase: "Password must contain one lowercase letter",
    digit: "Password must contain one digit",
    specialChar: "Password must contain one special characters",
    space: "Password must not contain spaces",
  },
  repassword: "Passwords do not match",
};

const checkRegex = (regex, str) => {
  return regex.test(str);
};

const setErrorMsg = (field, msg) => {
  const errorElm = document.getElementById(`${field}-error-msg`);
  if (errorElm && msg) {
    errorElm.textContent = msg;
  } else {
    errorElm.textContent = "";
  }
};

const trimValue = (str) => {
  return str.trim();
};

const checkPassword = (password) => {
  if (password.length < 8) {
    setErrorMsg("password", errorMsg.password.length);
    return false;
  }
  if (!checkRegex(regexChars.uppercase, password)) {
    setErrorMsg("password", errorMsg.password.uppercase);
    return false;
  }
  if (!checkRegex(regexChars.lowercase, password)) {
    setErrorMsg("password", errorMsg.password.lowercase);
    return false;
  }
  if (!checkRegex(regexChars.digit, password)) {
    setErrorMsg("password", errorMsg.password.digit);
    return false;
  }
  if (!checkRegex(regexChars.specialChar, password)) {
    setErrorMsg("password", errorMsg.password.specialChar);
    return false;
  }
  if (checkRegex(regexChars.space, password)) {
    setErrorMsg("password", errorMsg.password.space);
    return false;
  }
  return true;
};

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
