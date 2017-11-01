import jwt from 'jsonwebtoken';

/**
 * Class representing controller
 *
 * @class tokenController
 */
class tokenController {
  /**
   * create a token
   *
   * @static
   * @param {object} user - The user object
   * @return {object} Create a token
   * @memberof tokenController
   */
  static createToken(user) {
    const token = jwt.sign({
      id: user.name
    }, process.env.SECRET, {
      expiresIn: 48 * 60 * 60
    });
    return token;
  }
  // confirm the token

  /**
   * create a token
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The next object
   * @return {object} Create a token
   * @memberof tokenController
   */
  static confirmToken(req, res, next) {
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
}
export default tokenController;
