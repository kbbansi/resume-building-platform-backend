/**
 * wigl-mysql is the database connection config 
 * for accessing the Work in Ghana Limited SQL database
 */
const mysql = require('mysql');

let WiGLConnPool;

// create reusable connection pool

WiGLConnPool = mysql.createPool({
    host: 'someseversomewhere',
    port: 'SomePortNumber',
    user: WiGLDBUser,
    password: WiGLDBPassword,
    database: WiGLDBName,
    connectionLimit: 50
});

WiGLConnPool.getConnection(function wiglSQLDatabase(err, connection) {
    if (err) {
        switch(err.code){}
    } if (connection) {
        console.log('Established Connection');
        connection.release();
    }
});

module.exports =  WiGLConnPool;