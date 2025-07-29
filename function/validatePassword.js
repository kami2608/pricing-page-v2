import setErrorMsg from "./setErrorMsg.js";
import { errorMsg, regexChars } from "./initial.js";
import { checkRegex } from "./utilitiesFunc.js";

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

export default checkPassword;
