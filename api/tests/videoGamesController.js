const chai = require('chai')
const mocha = require('mocha')
const {expect} = require('chai');
const {apiInfoTotal} = require('../src/controllers/videoGamesController');

describe('VideoGames Controller', () =>{
    describe.only('test getAllGames API', () =>{
        it('Devuelve un arreglo', (done) =>{
            const allGamesApi = apiInfoTotal();
            // .then((res) =>{
            //     expect(res).to.be.a('array');
            //     done();
            // }, (err) =>{
            //     Promise.reject()
            // })
            expect(allGamesApi).to.be.a('array');
            done();
        });
        it('Devuelve un arreglo que no esté vacío', (done) =>{
            const allGamesApi = apiInfoTotal();
            expect(allGamesApi).not.to.be.empty;
            done();
        });
        it('Devuelve un arreglo con 100 videoGames', (done) =>{
            const allGamesApi = apiInfoTotal();
            expect(allGamesApi).to.have.lengthOf(100);
            done();
        });
    });
});