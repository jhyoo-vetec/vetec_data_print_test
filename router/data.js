var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var sql = require('../model/db_sql')();
var pool = require('../model/db_connect');

router.get('/data_print', async function (req, res) {
  con = await pool.getConnection();
    var sql = 'select * from bwanalogtable where tagname="temp" ORDER BY LogDate DESC, LogTime DESC LIMIT 10';
    data = await con.query(sql);
    sql ='select target_temp from target_temp where id =?';
    target_temp = await con.query(sql,["test_user"]);
    con.release();
    res.render('data',{data:data,target_temp:target_temp});
  

  
  // // // temp = sql.get_user_temp("test_user",function(err,target_temp){
  // // //   if(err) console.log(err);
  // // //   else{
  // // //     console.log("!!!!"+JSON.stringify(target_temp));
  // // //   }
  // // // })

  // // console.log("taget" + data)
  // // console.log("list" +  temp)

  // res.render('data',{data:data,target_temp:target_temp});
  });
module.exports = router;