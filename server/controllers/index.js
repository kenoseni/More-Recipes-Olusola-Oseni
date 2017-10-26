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
    }
    
}
