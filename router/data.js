var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = require('../model/db_sql')();

router.get('/data_print', function (req, res) {

  data = sql.select(function(err,data){
      if(err) console.log(err);
      else{
        console.log(JSON.stringify(data));
      
      }

      sql.pool.end(function(err){
        if(err) console.log(err);
        else{
          console.log('connection pool has closed');
          console.log('app.js finished');
        }
      })

    })
  temp = sql.get_user_temp("test_user",function(err,target_temp){
    if(err) console.log(err);
    else{
      console.log("!!!!"+JSON.stringify(target_temp));
    }
  })

  console.log("taget" + data)
  console.log("list" +  temp)

  res.render('data',{data:data,target_temp:target_temp});
  });
  module.exports = router;