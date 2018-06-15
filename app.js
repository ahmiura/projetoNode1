var app = require('./config/express')();
//var rotasProdutos = require('./app/routes/produtos')(app);

var porta = 3000


app.listen(porta, function(){
  console.log("Servidor rodando...");
});
