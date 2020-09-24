// importando os módulos usados.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bd = require('mysql2');

// Configurando o uso de Json.
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({
    extended: true

}));

// Config. do acesso ao Banco de Dados.

var bdconn = bd.createConnection({
    host: 'localhost',
    user: '',
    password:'',
    database:'api_iot'
})

// Rota para listar os equipamentos cadastrados no Banco de Dados.
app.get('/equipamentos', function(req,res){
    bdconn.query("SELECT nome,local,descricao FROM tabela_equip", function (error,results,fields){
        if (error) throw error;
        console.log(results);
        return res.send({erro: false, data: results, message: 'Lista dos equipamentos'})
    });
});

//Inicialização da escuta do servidor.

app.listen(80, function() {
    console.log("App Rodando.")
});
module.exports = app;