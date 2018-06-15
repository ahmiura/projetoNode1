var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function(){

    //Antes de cada teste executa a funcao de limpeza
    beforeEach(function(done){
        let connection = express.infra.connectionFactory();
        connection.query("delete from produtos", function(err, result){
            if(!err) {
                done();
            } else {
                console.log("Erro na conexão --> "+err);
            };
        });
    });

    it('#listagem json', function(done){
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#Cadastro do Produto com título em branco', function(done){
        request.post('/produtos')
        .send({titulo : "", descricao : "Teste1"})
        .expect(400,done);
    });

    it('#Cadastro do Produto com preço no formato inválido', function(done){
        request.post('/produtos')
        .send({titulo : "Livro Teste", descricao : "Teste1", preco : "23,43"})
        .expect(400,done);
    });

    it('#Cadastro de Produtos com valores válidos', function(done){
        request.post('/produtos')
        .send({titulo : "Livro Teste", descricao : "Livro inserido pelo SuperTest", preco : 25.55})
        .expect(302,done);
    });
});