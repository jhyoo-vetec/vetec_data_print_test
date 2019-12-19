var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = require('../model/db_sql');

router.get('/data_print', function (req, res) {
    sql.select(function(err,data){
      if(err) console.log(err);
      else{
        console.log(data);
      }

      db_sql.pool.end(function(err){
        if(err) console.log(err);
        else{
          console.log('connection pool has closed');
          console.log('app.js finished');
        }
      })

    })
  });
// var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
        //   'fields : ' + JSON.stringify(fields);
        // res.render("test.ejs", {
        //     data: result
        // });
  module.exports = router 