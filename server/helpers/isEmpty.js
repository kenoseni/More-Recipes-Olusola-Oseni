const isEmpty = (str) => {
  const regEx = /^[]+$/;
  if (str.match(regEx) || !str.length) {
    return true;
  }
  return false;
};
export default isEmpty;
