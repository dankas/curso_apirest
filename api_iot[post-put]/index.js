// teste de api para  mini curso
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var banco = require('mysql2');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
    }));

var dbConn = banco.createConnection({
        host: 'localhost',
        user: "user",
        password: "user",
        database: 'api_teste'
    });

app.get ('/', function (req, res)  {
     
     dbConn.query("SELECT * FROM monitoramento", function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return res.send({ error: false, data: results, message: '' });
    
    });
    
});
app.get ('/equipamento/:nome/estado', function (req, res)  {
     
    dbConn.query("SELECT estado FROM equipamento WHERE nome=? ",[req.params.nome], function (error, results, fields) {
       if (error) throw error;
       console.log(results.length);
       if (!results.length == 0) {
        return res.send({ error: false, data: results, message: 'estado do equipamentos' });
       }
       else {
           console.log("erro de parametro");
           return res.send({ error: true, data: results, message: 'Erro de parametro' });
       }
       
   
   });
   
})
app.post ('/', function (req, res) {
    if (!(req.body.leituraTensao && req.body.leituraCorrente)) {
        console.log("erro de valores incompletos");
        return res.status(400).send({ error:true, message: 'Valores incompletos.' }); 
    } 
     let valorTensao = req.body.leituraTensao;
     let valorCorrente = req.body.leituraCorrente;
    
    dbConn.query("INSERT INTO monitoramento SET ? ", { tensao: valorTensao, corrente: valorCorrente }, function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        return res.send({ error: false, data: results, message: '' });
    })
});

app.put('/equipamento/:nome', function (req, res) {
    if (!req.body.chaveEquipamento) {
        console.log("erro de valores incompletos");
        return res.status(400).send({ error:true, message: 'Valores incompletos.' }); 
    }     
    let estadoEquipamento = req.body.chaveEquipamento;
    let nomeEquipamento = req.params.nome;
    console.log(estadoEquipamento);
    dbConn.query( "UPDATE equipamento SET estado = ? WHERE nome= ?", [estadoEquipamento,  nomeEquipamento], function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Estado foi atualizado com sucesso.' });
    })

});

app.listen(80, function () {
    console.log('Node app is running');
});
 
module.exports = app;