import jwt from 'jsonwebtoken';

export default {
  // create a user token
  createToken(user) {
    const token = jwt.sign({
      id: user.id,
      name: user.name,
      password: user.password
    }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60
    });
    return token;
  },
  // confirm the token
  confirmToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        status: 'fail',
        message: 'access denied, no token provided'
      });
    } else if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            message: err.message,
          });
        }
        req.decoded = decoded;
        return next();
      });
    }
  }
};
