import recipes from '../../recipes'

const recipeStore = [...recipes];
export default {
  list(req, res) {
    return new Promise((resolve) => {
      if (recipeStore) {
        resolve(res.json(recipeStore));
      }
      Promise.reject(new Error({ message: 'no recipes found' }));
    })
      .then(data => res.status(200).send(data))
      .catch((error) => {
        if (error.message === 'no recipes found') {
          res.status(404).json({ message: 'no recipes found' });
        }
      });
  },
  create(req, res) {
    return new Promise((resolve) => {
      if (req.body) {
        recipeStore.push(req.body);
        resolve(recipeStore);
      }
      Promise.reject(new Error({ message: 'no recipe added' }));
    })
      .then(() => res.status(201).send({ message: 'recipe added' }))
      .catch((error) => {
        if (error.message === 'no recipe added') {
          res.status(404).json({ message: 'no recipe added' });
        }
      });
  },

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
          resolve();
        }
      }
      Promise.reject(new Error({ message: 'no recipe modified' }));
    })

      .then(() => res.status(200).send({ message: 'recipe modified' }))
      .catch((error) => {
        if (error.message === 'no recipe modified') {
          res.status(404).json({ message: 'no recipe modified' });
        }
      });
  },
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
  },
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
  },

};

