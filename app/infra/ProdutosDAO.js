console.log("1-ProdutosDAO");

function ProdutosDAO(connection) {
    this._connection = connection;
    console.log("3-ProdutosDAO");
}

ProdutosDAO.prototype.lista1 = function(callback) {
    console.log("4-ProdutosDAO");
    this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salva = function(produtos, callback) {
    //this._connection.query('insert into produtos set ?', produtos);
    this._connection.query('insert into produtos(titulo, preco, descricao) values (?, ?, ?)', [produtos.titulo, produtos.preco, produtos.descricao], callback);
}

module.exports = function (){
    console.log("2-ProdutosDAO");
    console.log(this);
    return ProdutosDAO;
};
