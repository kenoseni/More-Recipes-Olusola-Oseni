import recipesController from '../controllers'

export default (app) => {
    app.get('/recipes', recipesController.list)
    app.post('/recipes', recipesController.create)
    
}
