var mysql = require('mysql');
//FACTORY METHOD
function createDbConnection() {
    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs_test'
        });
    } else {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casadocodigo_nodejs'
        });
    }
}

//Wrapper
module.exports = function () {
    return createDbConnection;
}