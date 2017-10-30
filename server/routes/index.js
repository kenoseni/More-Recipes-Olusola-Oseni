import controller from '../controllers';
import validate from '../middleware';

const listController = controller.list;
const createController = controller.create;
const modifyController = controller.modify;
const removeController =  controller.remove;
const findOneController = controller.findOne
const reviewController = controller.review
const upvoteController = controller.vote;
const downvoteController = controller.vote;





export default (app) => {
  app.get('/api/recipes', listController.list );
  app.post('/api/recipes', validate.recipeInputs, createController.create);
  app.put('/api/recipes/:recipeId', modifyController.modify );
  app.delete('/api/recipes/:recipeId', removeController.delete );
  app.get('/api/recipes/:recipeId', findOneController.findOne );
  app.post('/api/recipes/:recipeId/review', reviewController.addReview);
  app.post('/api/recipes/:recipeId/upvote', upvoteController.upVote);
  app.post('/api/recipes/:recipeId/downvote', downvoteController.downVote);
};
