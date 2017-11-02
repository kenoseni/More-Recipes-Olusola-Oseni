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
  /**
     * Modify the recipe added
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Object representing the recipe modified
     * @memberof recipeController
     */
  static modify(req, res) {
    return db.Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        },
      })
      .then(recipe => recipe
        .update({
          name: req.body.title,
          ingredients: req.body.ingredients,
          directions: req.body.directions
        }))
      .then(modifiedRecipe => res.status(200).send({
        status: 'Done',
        message: 'Recipe modified successfully',
        id: modifiedRecipe.id,
        name: modifiedRecipe.title,
        ingredients: modifiedRecipe.ingredients,
        directions: modifiedRecipe.directions,
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
       * Delete a recipe added
       *
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} a message that recipe was deleted successfully
       * @memberof recipeController
       */
  static removeRecipe(req, res) {
    return db.Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .then(recipe => recipe.destroy())
      .then(() => res.status(200).send({
        status: 'Done',
        message: 'Recipe deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
       * Get all recipes
       *
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} Object of all recipes
       * @memberof recipeController
       */
  static getAllRecipes(req, res) {
    return db.Recipe
      .findAll({
        attributes: [
          'id', 'name', 'ingredients', 'directions', 'time', 'upvotes', 'downvotes', 'views'
        ],
      })
      .then(recipe => res.status(200).send(recipe))
      .catch(error => res.status(400).send(error));
  }
}
export default recipeController;
