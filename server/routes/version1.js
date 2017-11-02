import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();
// Register a user on the platform
router.post('/users/signup', controllers.userController.signup);
// Signin a user
router.post('/user/signin', controllers.userController.signin);
// Get favorite recipe
router.get('/users/:userId/recipes', middleware.authenticate.confirmToken, controllers.userController.getUserFavorites);
// Add a recipe
router.post('/recipes', middleware.authenticate.confirmToken, controllers.recipeController.addRecipe);
// Modify a recipe
router.put('/recipes/:userId', middleware.authenticate.confirmToken, controllers.recipeController.modify);
// Delete a recipe
router.delete('/recipes/:userId', middleware.authenticate.confirmToken, controllers.recipeController.removeRecipe);
// Get all recipes
router.get('/recipes', controllers.recipeController.getAllRecipes);
// Allow user post review on a recipe
router.post('/recipes/:recipeId/reviews', middleware.authenticate.confirmToken, controllers.reviewController.postReview);
// Add favorite recipes
router.post('/users/:userId/recipes', middleware.authenticate.confirmToken, controllers.favoriteController.addUserFavorite);
// Delete favorite recipes
router.delete('/users/:userId/recipes', middleware.authenticate.confirmToken, controllers.favoriteController.removeUserFavorite);
export default router;
