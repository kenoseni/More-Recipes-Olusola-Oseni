import express from 'express';
import control from '../controllers';
import mware from '../middleware';

const router = express.Router();
// Register a user on the platform
router.post('/users/signup', control.userController.signup);
// Signin a user
router.post('/users/signin', control.userController.signin);
// Get all users
// router.get('./users', control.userController.getUsers);
// Get favorite recipe
router.get('/users/:userId/recipes', mware.auth.confirmToken,
  control.userController.getUserFavorites);
// Add a recipe
router.post('/recipes', mware.auth.confirmToken,
  control.recipeController.addRecipe);
// Modify a recipe
router.put('/recipes/:recipeId', mware.auth.confirmToken,
  control.recipeController.modify);
// Delete a recipe
router.delete('/recipes/:recipeId', mware.auth.confirmToken,
  control.recipeController.removeRecipe);
// Get all recipes
router.get('/recipes', control.recipeController.getAllRecipes);
// Allow user post review on a recipe
router.post('/recipes/:recipeId/reviews', mware.auth.confirmToken,
  control.reviewController.postReview);
// Add favorite recipes
router.post('/users/:userId/recipes', mware.auth.confirmToken, control.favController.addUserFavorite);
// Delete favorite recipes
router.delete('/users/:userId/recipes', mware.auth.confirmToken, control.favController.removeUserFavorite);
export default router;
