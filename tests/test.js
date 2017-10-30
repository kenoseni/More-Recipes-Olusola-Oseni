import moch from 'mocha';
import chai from 'chai';
import supertest from 'supertest'
import app from '../app'

const request = supertest.agent(app);
const expect = chai.expect

const realRecipe = [{
    id: 1,
    name: 'Jollof Rice and Chicken',
    ingredients: ['rice', 'salt', 'maggi', 'vegetable oil', 'onions', 'tomatoes', 'pepper'],
    directions: 'let the vegetable oil boil for 5 min, add a paste of pepper, onions, maggi and tomatoes and let it boil for 10 min then wash the rice into the mixture and allow to boil ',
    upvotes: 40,
    downvotes: 5,
    favorite: 25,
    view: 150,
    review: []
  }, {
    name: 'Corn Meal',
    ingredients: ['corn', 'dry fish'],
    directions: 'ground corn and dry fish together ',
    upvotes: 10,
    downvotes: 2,
    favorite: 1,
    view: 1,
    review: ['taste is the difference']
}];
describe('More Recipes', () => {
    it('should allow a user to add a recipe', (done) => {
      request
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(realRecipe[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('recipe added');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user to get all recipes', (done) => {
        request
          .get('/api/recipes')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(realRecipe)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            if (err) return done(err);
            done();
          });
      });
    it('should allow a user to modify a recipe', (done) => {
      request
        .put('/api/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(realRecipe[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('recipe modified');
          expect(res.body.recipe.name).to.equal('Corn Meal');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user to get one recipe', (done) => {
      request
        .get('/api/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(realRecipe[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user to delete one recipe', (done) => {
      request
        .delete('/api/recipes/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(realRecipe[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('recipe deleted');
          if (err) return done(err);
          done();
        });
    });
    
});
