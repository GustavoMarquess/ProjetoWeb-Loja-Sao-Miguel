const Sequelize = require('sequelize');
const sequelize = new Sequelize('zqmyzsxg','zqmyzsxg','D0CgcJncJi_Og0XClh4V5bycEJNNig7k',{
    host: 'snuffleupagus.db.elephantsql.com',
    dialect: 'postgres',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})


//TESTANDO A CONEXAO COM O BANCO
 sequelize.authenticate().then(function(){
         console.log('Conectado no banco com sucesso!');
 }).catch(function(err){
    console.log('Falha ao se conectar:'+err);
 })

module.exports = {Sequelize, sequelize}

