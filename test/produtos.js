var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');

describe('ProdutosController', function () {

    beforeEach(function (done) {
        var connection = express.infra.connectionFactory();
        connection.query("delete from produtos", function (err, results) {
            if (!err) {
                done();
            }
        });
    });

    /*databaseCleaner.clean('casadocodigo_nodejs_test', function(err, produtos){
        if(!err){
            console.log(produtos);
        }
    });*/

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({ tituloLivro: "", descricaoLivro: "novo Livro teste" })
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function (done) {
        request.post('/produtos')
            .send({ tituloLivro: "titulo", descricaoLivro: "Nodzinho", precoLivro: 3500 })
            .expect(302, done);
    });
});