const isValid = (errors) => {
  for (const key in errors) {
    if (errors[key] !== "") return false;
  }
  return true;
};

export default isValid;
