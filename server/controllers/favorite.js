import db from '../models';

/**
 * Class representing controller
 *
 * @class favoriteController
 */
class favoriteController {
  /**
     * Add a review for a recipe
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Object representing the recipe reviewed
     * @memberof favoriteController
     */
  static addUserFavorite(req, res) {
    return db.Favorite
      .findOrCreate({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .spread((favorite, created) => {
        if (!created) {
          return res.status(409).send({
            status: 'Fail',
            message: 'Favorite already exist'
          });
        }
        return res.status(201).send({
          status: 'Done',
          message: 'Recipe added to favorites',
          recipeId: favorite.recipeId,
        });
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * Delete a recipe from user favorites
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {any} Object representing success status or
   * error status
   * @memberof FavoriteController
   */
  static removeUserFavorite(req, res) {
    return db.Favorite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id
        }
      })
      .then(favorite => favorite
        .destroy())
      .then(() => res.status(200).send({
        status: 'success',
        message: 'Recipe removed from favorites'
      }))
      .catch(error => res.status(400).send(error));
  }
}
export default favoriteController;
