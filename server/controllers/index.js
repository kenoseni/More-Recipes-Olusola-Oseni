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
    }
    
}
