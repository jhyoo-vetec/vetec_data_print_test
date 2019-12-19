var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/data_print', function (req, res) {
    var connection = mysql.createConnection({
      host: 'localhost',
      post: 3306,
      user: 'root',
      password: '123123',
      database: 'test'
    });
    connection.connect();
    connection.query('select * from bwanalogtable', function (err, rows, fields) {
      connection.end();
      if (!err) {
        console.log(rows);
        console.log(fields);
        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
          'fields : ' + JSON.stringify(fields);
        res.render("test.ejs", {
            data: result
        });
      } else {
        console.log('query error : ' + err);
        res.send(err);
      }
    });
  });

  module.exports = router 