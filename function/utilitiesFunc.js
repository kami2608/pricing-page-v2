const checkRegex = (regex, str) => {
  return regex.test(str);
};

const trimValue = (str) => {
  return str.trim();
};

export { checkRegex, trimValue };
