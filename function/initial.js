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

const errors = {
  username: "",
  email: "",
  password: "",
  repassword: "",
};

export {
  usernameInput,
  emailInput,
  passwordInput,
  repasswordInput,
  regexChars,
  errorMsg,
  errors,
};
