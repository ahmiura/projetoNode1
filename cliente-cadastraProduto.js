var http = require('http');

var configuracoes = {
    hostname : 'localhost',
    port : 3000,
    method : 'post',
    path : '/produtos',
    headers : {
      'Accept' : 'application/json',
      'Content-type' : 'application/json'
    }
}

var cliente = http.request(configuracoes, function (res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Corpo -->' + body);
    });
});

var produto = {
    titulo : '',
    descricao : 'Teste de insert via terminal',
    preco : 99.99
}

cliente.end(JSON.stringify(produto));
