var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var sql = require('../model/db_sql')();
var pool = require('../model/db_connect');

router.get('/data_print', async function (req, res) {
    var par=[];

    if(req.query.date===undefined){
        console.log('null값');
        var sql = 'select * from bwanalogtable where tagname="temp" ORDER BY LogDate DESC, LogTime DESC LIMIT 100';
    }else{
        console.log(req.query.date);
        var sql = 'select * from bwanalogtable where tagname="temp" and date(logdate)= ? ORDER BY LogDate DESC, LogTime DESC LIMIT 100';
        var par=[req.query.date];
    }
    console.log("sql:"+sql);
    console.log("par:"+par);
    con = await pool.getConnection();
    
    data = await con.query(sql,par);

    console.log(JSON.stringify(data));

    sql ='select target_temp from target_temp where id =?';
    target_temp = await con.query(sql,["test_user"]);
    con.release();
    res.render('data',{data:data,target_temp:target_temp});
  
  });
module.exports = router;