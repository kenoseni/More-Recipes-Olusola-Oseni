import recipes from '../../recipes';

const recipeStore = [...recipes];
export default {
  addReview(req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1) {
        if (recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          recipeStore[i].review.push(req.body);
          resolve(recipeStore[i]);
        }
      }
      Promise.reject(new Error({ message: 'no review added' }));
    })
      .then(recipe => res.status(201).send({ message: 'review added', recipe }))
      .catch((error) => {
        if (error.message === 'no review added') {
          res.status(404).send({ message: 'no review added' });
        }
      });
  }
};
