import db from '../models';
/**
 * Class representing controller
 *
 * @class recipeController
 */
class recipeController {
  /**
     * Add a recipe
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Object representing the recipe added
     * @memberof recipeController
     */
  static addRecipe(req, res) {
    return db.Recipe
      .create({
        userId: req.decoded.userId,
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => res.status(201).send({
        status: 'Done',
        message: 'Recipe created successfully',
        Id: recipe.Id,
        userId: recipe.userId,
        name: recipe.name,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes,
        views: recipe.views
      }))
      .catch(error => res.status(400).send(error));
  }
}
export default recipeController;

