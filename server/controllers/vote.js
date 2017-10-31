import recipes from '../../recipes'
const recipeStore = [...recipes];
export default {
  upVote (req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1 ) {
        if(recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          recipeStore[i].upvotes +=1
          resolve(recipeStore[i])
        }
      }
      Promise.reject(new Error({ message: 'no upvote added'}))
    })
    .then(recipe => res.status(201).send({ message: 'upvote added', recipe}))
    .catch((error) => {
      if (error.message === 'no upvote added') {
        res.status(400).send({ message: 'no upvote added' });
      }
    });
  },
  downVote (req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1 ) {
        if(recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          recipeStore[i].downvotes +=1
          resolve(recipeStore[i])
        }
      }
      Promise.reject(new Error({ message: 'no downvote added'}))
    })
    .then(recipe => res.status(201).send({ message: 'downvote added', recipe}))
    .catch((error) => {
      if (error.message === 'no downvote added') {
        res.status(400).send({ message: 'no downvote added' });
      }
    });
  }
  
};
