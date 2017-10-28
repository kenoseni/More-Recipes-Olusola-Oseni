import recipesController from '../controllers';

export default (app) => {
  app.get('/api/recipes', recipesController.list);
  app.post('/api/recipes', recipesController.create);
  app.put('/api/recipes/:recipeId', recipesController.modify);
  app.delete('/api/recipes/:recipeId', recipesController.delete);
  app.get('/api/recipes/:recipeId', recipesController.findOne);
  app.post('/api/recipes/:recipeId/review', recipesController.addReview);
};
