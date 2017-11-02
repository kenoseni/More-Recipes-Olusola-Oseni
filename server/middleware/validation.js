import helpers from '../helpers';

export default {
  recipeInputs(req, res, next) {
    if (!req.body.name || helpers.isEmpty(req.body.name)) {
      return res.status(406).send({
        status: 'fail',
        message: 'Name cannot be empty'
      });
    }
    next();
  }
};
