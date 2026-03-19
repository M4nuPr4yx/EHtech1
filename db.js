// Meu arquivo de conexão com o banco de dados

const mysql = require('mysql2/promise')

//pool de conexão

const pool = mysql.createPool({
    //criar as configurações do BD
    //host é o endereço do banco
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"ehtech",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:2
})

module.exports = pool