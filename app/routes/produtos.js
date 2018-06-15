
//var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){

    app.get('/produtos', function(request, response, next){
        /*response.send("<html><body><h1>Listagem de Produtos</h1></body></html>"); */
        console.log("Abrindo conexão com o BD!");
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);

        console.log("Chama o método lista1!");
        ProdutosDAO.lista1(function(err, results){
            if (err) {
                return next(err);
            }

            console.log("Atendendo requisição...");
            response.format({
                 html: function() {
                    response.render('produtos/lista',{lista:results});
                },
                 json: function() {
                     response.json(results);
                 }
            });
        });

        connection.end();
        console.log("Fechando conexão com o BD!");
    });


    app.get('/produtos/form', function(request, response) {
        response.render('produtos/form', {errosValidacao:{}, produto:{}});

    });


    app.post('/produtos', function(request, response) {
        var produto = request.body;

        console.log(produto);

        request.assert('titulo', 'Título obrigatório').notEmpty();
        request.assert('preco','Formato do preço inválido').isFloat();

        var erros = request.validationErrors();

        if (erros) {
            console.log('Erro na validação --> '+erros);
            response.format({
                html: function() {
                    response.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});
                },
                json: function() {
                    response.status(400).json(erros);
                }
            });

            return;
        }

        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);


        ProdutosDAO.salva(produto, function(err, results){
            if (err == null) {
                response.redirect('/produtos');
            }else {
                console.log("Erro no insert --> "+err);
            }
        });

    });
}
