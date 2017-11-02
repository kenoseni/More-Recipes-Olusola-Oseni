const getUser = (req, res, next) => {
  if (req.decoded.id === 1) {
    return next();
  }
};
export default getUser;
