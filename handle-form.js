const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");

var validate = 0;

const checkSpecialChars = (str) => {
  // const special_char = "!@#$%^&*()_-+=,.?";
  // return str.split("").some((char) => special_char.includes(char));
  const specialChar = /[!@#$%^&*()_\-+=,.?]/;
  return specialChar.test(str);
};

const checkChars = (regexChars, str) => {
  return regexChars.test(str);
};

usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  const errorMsg = document.getElementById("username-error-msg");
  errorMsg.textContent = checkSpecialChars(username)
    ? "Username must not contain special characters"
    : "";
  validate = errorMsg.textContent == "" ? 1 : 0;
});

emailInput.addEventListener("input", () => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const email = emailInput.value.trim();
  const errorMsg = document.getElementById("email-error-msg");
  errorMsg.textContent = emailRegex.test(email) ? "" : "Invalid email format";
  validate = errorMsg.textContent == "" ? 1 : 0;
});

passwordInput.addEventListener("input", () => {
  const errorMsg = document.getElementById("password-error-msg");
  const password = passwordInput.value.trim();
  const errors = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain one uppercase letter");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain one digit");
  if (!checkSpecialChars(password))
    errors.push("Password must contain one special characters");
  if (/\s/.test(password)) errors.push("Password must not contain spaces");
  errorMsg.innerHTML = errors.length > 0 ? errors.join("<br>") : "";
  validate = errorMsg.textContent == "" ? 1 : 0;
});

repasswordInput.addEventListener("input", () => {
  const errorMsg = document.getElementById("repassword-error-msg");
  errorMsg.textContent =
    repasswordInput.value == passwordInput.value ? "" : "Password not match";
  validate = errorMsg.textContent == "" ? 1 : 0;
});

document.getElementById("register-form").addEventListener("submit", () => {
  if (validate == 1) {
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
