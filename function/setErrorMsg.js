const setErrorMsg = (field, msg) => {
  const errorElm = document.getElementById(`${field}-error-msg`);
  if (errorElm && msg) {
    errorElm.textContent = msg;
  } else {
    errorElm.textContent = "";
  }
};

export default setErrorMsg;
