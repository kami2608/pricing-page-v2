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

const checkRegex = (regex, str) => {
  return regex.test(str);
};

const errorMsg = (id) => {
  return document.getElementById(id);
};

const stringTrim = (str) => {
  return str.trim();
};

usernameInput.addEventListener("input", () => {
  const username = stringTrim(usernameInput.value);
  errorMsg("username-error-msg").textContent = checkRegex(
    regexChars.specialChar,
    username
  )
    ? "Username must not contain special characters"
    : "";
  if (errorMsg("username-error-msg").textContent == "") delete errors.username;
});

emailInput.addEventListener("input", () => {
  const email = stringTrim(emailInput.value);
  errorMsg("email-error-msg").textContent = checkRegex(regexChars.email, email)
    ? ""
    : "Invalid email format";
  if (errorMsg("email-error-msg").textContent == "") delete errors.email;
});

passwordInput.addEventListener("input", () => {
  const password = stringTrim(passwordInput.value);
  const errorsPwd = [];
  if (password.length < 8)
    errorsPwd.push("Password must be at least 8 characters");
  if (!checkRegex(regexChars.uppercase, password))
    errorsPwd.push("Password must contain one uppercase letter");
  if (!checkRegex(regexChars.lowercase, password))
    errorsPwd.push("Password must contain one lowercase letter");
  if (!checkRegex(regexChars.digit, password))
    errorsPwd.push("Password must contain one digit");
  if (!checkRegex(regexChars.specialChar, password))
    errorsPwd.push("Password must contain one special characters");
  if (checkRegex(regexChars.space, password))
    errorsPwd.push("Password must not contain spaces");
  errorMsg("password-error-msg").innerHTML =
    errorsPwd.length > 0 ? errorsPwd.join("<br>") : "";
  if (errorMsg("password-error-msg").textContent == "") delete errors.password;
});

repasswordInput.addEventListener("input", () => {
  errorMsg("repassword-error-msg").textContent =
    repasswordInput.value == passwordInput.value ? "" : "Password not match";
  if (errorMsg("repassword-error-msg").textContent == "")
    delete errors.repassword;
});

document.getElementById("register-form").addEventListener("submit", () => {
  if (Object.keys(errors).length == 0) {
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
