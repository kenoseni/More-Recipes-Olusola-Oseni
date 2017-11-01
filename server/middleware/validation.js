import helpers from '../helpers';

const isEmpty = helpers.isEmpty;

export default {
  recipeInputs(req, res, next) {
    if (!req.body.name || isEmpty(req.body.name)) {
      return res.status(406).send({
        status: 'fail',
        message: 'Name cannot be empty'
      });
    }
    next();
  }
};
