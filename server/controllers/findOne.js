import recipes from '../../recipes';

const recipeStore = [...recipes];
export default {
  findOne(req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1) {
        if (recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          resolve(recipeStore[i]);
        }
      }
      Promise.reject(new Error({ message: 'recipe not found' }));
    })
      .then(recipe => res.status(200).send({ recipe, message: 'recipe found' }))
      .catch((error) => {
        if (error.message === 'no recipe modified') {
          res.status(404).json({ message: 'recipe not found' });
        }
      });
  }
};
