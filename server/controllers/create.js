import recipes from '../../recipes';

const recipeStore = [...recipes];
export default {
  create(req, res) {
    return new Promise((resolve) => {
      if (req.body) {
        recipeStore.push(req.body);
        resolve(recipeStore[recipeStore.length - 1]);
      }
      Promise.reject(new Error({ message: 'no recipe added' }));
    })
      .then(recipe => res.status(201).send({ message: 'recipe added', recipe }))
      .catch((error) => {
        if (error.message === 'no recipe added') {
          res.status(404).json({ message: 'no recipe added' });
        }
      });
  }
};
