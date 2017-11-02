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
      .then(user => res.status(201).json({
        status: 'success',
        message: `User with userId: ${user.id} was successfully signed up`,

      }))
      .catch(error => res.status(500).send(error));
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
          email: req.body.email,
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
            const token = middleware.auth.createToken(user);
            return res.status(200).json({ token });
          });
      })
      .catch(error => res.status(500).send(error));
  }
  /**
   * get all users
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} return a json object of all users
   * @memberof userController
   */
  static getUsers(req, res) {
    return db.User
      .findAll({
        attributes: [
          'id', 'name', 'email'
        ]
      })
      .then(user => res.status(200).send(user))
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
