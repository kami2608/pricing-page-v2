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
    if (errors[key] != "") return false;
  }
  return true;
};

const errorMsg = {
  noError: " ",
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
  }
};

const stringTrim = (str) => {
  return str.trim();
};

usernameInput.addEventListener("input", () => {
  const username = stringTrim(usernameInput.value);
  if (!checkRegex(regexChars.specialChar, username)) {
    setErrorMsg("username", errorMsg.noError);
    errors.username = "";
  } else {
    setErrorMsg("username", errorMsg.username);
    errors.username = errorMsg.username;
  }
});

emailInput.addEventListener("input", () => {
  const email = stringTrim(emailInput.value);
  if (checkRegex(regexChars.email, email)) {
    setErrorMsg("email", errorMsg.noError);
    errors.email = "";
  } else {
    setErrorMsg("email", errorMsg.email);
    errors.email = errorMsg.email;
  }
});

passwordInput.addEventListener("input", () => {
  const password = stringTrim(passwordInput.value);
  const errorsPwd = [];
  if (password.length < 8) errorsPwd.push(errorMsg.password.length);
  if (!checkRegex(regexChars.uppercase, password))
    errorsPwd.push(errorMsg.password.uppercase);
  if (!checkRegex(regexChars.lowercase, password))
    errorsPwd.push(errorMsg.password.lowercase);
  if (!checkRegex(regexChars.digit, password))
    errorsPwd.push(errorMsg.password.digit);
  if (!checkRegex(regexChars.specialChar, password))
    errorsPwd.push(errorMsg.password.specialChar);
  if (checkRegex(regexChars.space, password))
    errorsPwd.push(errorMsg.password.space);
  if (errorsPwd.length > 0) {
    setErrorMsg("password", errorsPwd.join(". "));
    errors.password = errorsPwd.join(". ");
  } else {
    setErrorMsg("password", errorMsg.noError);
    errors.password = "";
  }
});

repasswordInput.addEventListener("input", () => {
  if (repasswordInput.value == passwordInput.value) {
    setErrorMsg("repassword", errorMsg.noError);
    errors.repassword = "";
  } else {
    setErrorMsg("repassword", errorMsg.repassword);
    errors.repassword = errorMsg.repassword;
  }
});

document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(errors);
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
