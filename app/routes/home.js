module.exports = function(app){
    app.get('/', function(req, res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista1(function(err, resultados){
            console.log("Entrou1111");
            res.render('home/index', {livros:resultados});
        });
        connection.end();
    });
};