var app = require('./config/express')();
//var rotasProdutos = require('./app/routes/produtos')(app);

var porta = 3001


app.listen(porta, function(){
  console.log("Servidor rodando...");
});
