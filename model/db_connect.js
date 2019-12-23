var mysql = require('mariadb');

    var config = require('./db_config');
    var pool = mysql.createPool({
        host:config.host,
        user:config.user,
        password:config.password,
        database : config.database
    });


module.exports = pool;