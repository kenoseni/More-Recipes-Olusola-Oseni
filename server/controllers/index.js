import recipes from "../../recipes"

export default {
    list (req, res) {
        return new Promise((resolve, reject) => {
            if(recipes) {
                resolve(res.json(recipes))
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
}
