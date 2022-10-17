const {apiInfoTotal} = require('../src/controllers/videoGamesController')
const {routeGame} = require('../src/routes/videoGameRoute')
const {supertest} = require('supertest');

const api = supertest(routeGame);

test('should return a 200 status code', async() =>{
    // const request = await request(apiInfoTotal).get('/').send();
     // console.log(response);
    // expect(response.statusCode).toBe(200);
    await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/)  
});
