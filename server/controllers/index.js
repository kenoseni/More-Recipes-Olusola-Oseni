import recipes from "../../recipes"

const recipeStore = [...recipes]

export default {
    list (req, res) {
        return new Promise((resolve, reject) => {
            if(recipeStore ) {
                resolve(res.json(recipeStore))
            }
            reject({message: "no recipes found"})
        })
        .then(data => res.status(200).send(data))
        .catch(error => {
            if (error.message === "no recipes found") {
                res.status(404).json({message: "no recipes found"})
            }
        })       
    }, 
    create(req, res) {
        return new Promise ((resolve, reject) => {
            if (req.body) {
                recipeStore.push(req.body)
                resolve(recipeStore)
            }
            reject({message: "no recipe added"})

        })
        .then(recipe => res.status(200).send({message: "recipe added"}))
        .catch(error => {
            if (error.message === "no recipe added") {
                res.status(404).json({message: "no recipes added"})
            }
        })
    },

    modify(req, res) {
        return new Promise ((resolve, reject) => {
            for (let i = 0; i < recipeStore.length; i++) {
                if(recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
                    recipeStore[i].name = req.body.name
                    recipeStore[i].ingredients = req.body.ingredients
                    recipeStore[i].directions = req.body.directions
                    recipeStore[i].upvotes = req.body.upvotes
                    recipeStore[i].downvotes = req.body.downvotes
                    recipeStore[i].favorite = req.body.favorite
                    recipeStore[i].view = req.body.view
                    resolve();
                }
                
                  
            }
            reject({message: "no recipe modified"})
            
            
        })
       
        .then(() => res.status(200).send({message: "recipe modified"}))
        .catch(error => {
            if (error.message === "no recipe modified") {
                res.status(404).json({message: "no recipes modified"})
            }
        })
    }, 
    delete (req, res) {
        return new Promise ((resolve, reject) => {
            for (let i = 0; i < recipeStore.length; i++) {
                if(recipeStore[i].id === parseInt(req.params.recipeId, 10)) {
                    recipeStore.splice(i, 1)
                    resolve();
                }
            }
            reject({message: "no recipe deleted"})
        })
        .then(() => res.status(200).send({message: "recipe deleted"}))
        .catch(error => {
            if (error.message === "no recipe modified") {
                res.status(404).json({message: "no recipes deleted"})
            }
        })

    }
    
}

