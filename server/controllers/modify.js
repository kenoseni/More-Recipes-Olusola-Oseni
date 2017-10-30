import recipes from '../../recipes'
const recipeStore = [...recipes];
export default {
  modify(req, res) {
    return new Promise((resolve) => {
      for (let i = 0; i < recipeStore.length; i += 1) {
        if (recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
          recipeStore[i].name = req.body.name;
          recipeStore[i].ingredients = req.body.ingredients;
          recipeStore[i].directions = req.body.directions;
          recipeStore[i].upvotes = req.body.upvotes;
          recipeStore[i].downvotes = req.body.downvotes;
          recipeStore[i].favorite = req.body.favorite;
          recipeStore[i].view = req.body.view;
          resolve(recipeStore[i]);
        }
      }
      Promise.reject(new Error({ message: 'no recipe modified' }));
    })

      .then((recipe) => res.status(201).send({ message: 'recipe modified', recipe}))
      .catch((error) => {
        if (error.message === 'no recipe modified') {
          res.status(404).json({ message: 'no recipe modified' });
        }
      });
  }
}