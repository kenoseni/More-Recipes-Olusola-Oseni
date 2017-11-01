import recipes from '../../recipes';

const recipeStore = [...recipes];
export default {
  delete(req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1) {
        if (recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          recipeStore.splice(i, 1);
          resolve();
        }
      }
      Promise.reject(new Error({ message: 'no recipe deleted' }));
    })
      .then(() => res.status(200).send({ message: 'recipe deleted' }))
      .catch((error) => {
        if (error.message === 'no recipe modified') {
          res.status(404).json({ message: 'no recipe deleted' });
        }
      });
  }
};
