import bcrypt from 'bcrypt';
import db from '../models';

import middleware from '../middleware';

const User = db.User;
const authenticate = middleware.authenticate;

export default {
  signup(req, res) {
    return User
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
  },
  signin(req, res) {
    return User
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
        const token = authenticate.createToken(user);
        res.status(200).send({ user, token });
      })
      .catch(error => res.status(400).send(error));
  }
};
