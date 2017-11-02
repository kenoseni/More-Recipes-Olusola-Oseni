import bcrypt from 'bcrypt';
import db from '../models';

import middleware from '../middleware';

// const User = db.User;
// const authenticate = middleware.authenticate;

/**
 * Class representing controller
 *
 * @class userController
 */
class userController {
  /**
   * Register a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof userController
   */
  static signup(req, res) {
    return db.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(201).send({
        status: 'success',
        message: 'User successfully signed up',
        user
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * Signin a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof userController
   */
  static signin(req, res) {
    return db.User
      .findOne({
        where: {
          name: req.body.name,
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'user not found'
          });
        }
        const encrypted = user.password;
        bcrypt.compare(req.body.password, encrypted)
          .then((correct) => {
            if (!correct) {
              res.status(401).send({
                message: 'Incorrect password'
              });
            }
          });
        const token = middleware.authenticate.createToken(user);
        res.status(200).send({ user, token });
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * get all user favorite recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object showing user and favorites
   * @memberof userController
   */
  static getUserFavorites(req, res) {
    return db.User
      .findById(req.params.userId, {
        attributes: ['name'],
        include: [{
          model: db.Favorite,
          attributes: ['recipeId'],
          include: [{
            model: db.Recipe,
            attributes: [
              'name', 'ingredients', 'directions', 'time',
              'upvotes', 'downvotes', 'views'
            ]
          }]
        }],
      })
      .then(fav => res.status(200).send(fav))
      .catch(error => res.status(400).send(error));
  }
}
export default userController;
