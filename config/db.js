const mysql = require("mysql2")

const pool = mysql.createPool({  
    host: '130.162.131.204',
    port: 3306,
    user: 'oott',
    password: 'oott',
    database: 'oott',
    multipleStatements: true
});

module.exports = pool.promise()