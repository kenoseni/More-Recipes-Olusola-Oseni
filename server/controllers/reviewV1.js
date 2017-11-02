import db from '../models';
/**
 * Class representing controller
 *
 * @class reviewController
 */
class reviewController {
  /**
     * Add a review for a recipe
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Object representing the recipe reviewed
     * @memberof recipeController
     */
  static postReview(req, res) {
    db.User.findOne({
      where: {
        id: req.decoded.user.id
      }
    })
      .then(() => db.Review
        .create({
          userId: req.decoded.user.id,
          recipeId: req.params.recipeId,
          name: req.body.name,
          content: req.body.content,
        }))
      .then(review => res.status(201).send({
        status: 'Done',
        message: 'Review created successfully',
        name: review.name,
        content: review.content
      }))
      .catch(error => res.status(400).send(error));
  }
}
export default reviewController;
