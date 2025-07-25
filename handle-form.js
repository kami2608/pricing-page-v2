const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");

var validate = 0;

const check_special_chars = (str) => {
  const special_char = "!@#$%^&*()_-+=,.?";
  return str.split("").some((char) => special_char.includes(char));
};

usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  const error_msg = document.getElementById("username-error-msg");
  error_msg.textContent = check_special_chars(username)
    ? "Username must not contain special characters"
    : "";
  validate = error_msg.textContent == "" ? 1 : 0;
});

emailInput.addEventListener("input", () => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const email = emailInput.value.trim();
  const error_msg = document.getElementById("email-error-msg");
  error_msg.textContent = emailRegex.test(email) ? "" : "Invalid email format";
  validate = error_msg.textContent == "" ? 1 : 0;
});

passwordInput.addEventListener("input", () => {
  const error_msg = document.getElementById("password-error-msg");
  const password = passwordInput.value.trim();
  const errors = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain one uppercase letter");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain one digit");
  if (!check_special_chars(password))
    errors.push("Password must contain one special characters");
  if (/\s/.test(password)) errors.push("Password must not contain spaces");
  error_msg.innerHTML = errors.length > 0 ? errors.join("<br>") : "";
  validate = error_msg.textContent == "" ? 1 : 0;
});

repasswordInput.addEventListener("input", () => {
  const error_msg = document.getElementById("repassword-error-msg");
  error_msg.textContent =
    repasswordInput.value == passwordInput.value ? "" : "Password not match";
  validate = error_msg.textContent == "" ? 1 : 0;
});

document.getElementById("submit-btn").addEventListener("click", () => {
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
