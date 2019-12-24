var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var sql = require('../model/db_sql')();
var pool = require('../model/db_connect');

router.get('/data_print', async function (req, res) {
    var par=[];
    console.log("current_page:"+req.query.current_page);

    let rowPerPage = 10;    // 페이지당 보여줄 글목록 : 10개
    let currentPage = req.query.current_page;  
    let beginRow =(currentPage-1)*rowPerPage;
    let model = {};
    if(req.query.date===undefined){
        var sql = 'select * from bwanalogtable where tagname="temp" ORDER BY LogDate DESC, LogTime DESC LIMIT 100';
    }else{
        var sql = 'select * from bwanalogtable where tagname="temp" and date(logdate)= ? ORDER BY LogDate DESC, LogTime DESC LIMIT 100';
        var par=[req.query.date];
    }
    con = await pool.getConnection();
    
    data = await con.query(sql,par);

    lastPage = data.length / rowPerPage; 
    if(data.length % rowPerPage != 0){ 
        lastPage++;
    }

    if(req.query.date===undefined){
        var sql = 'select * from bwanalogtable where tagname="temp" ORDER BY LogDate DESC, LogTime DESC LIMIT ?,?';
        var par=[beginRow,rowPerPage];
    }else{
        var sql = 'select * from bwanalogtable where tagname="temp" and date(logdate)= ? ORDER BY LogDate DESC, LogTime DESC LIMIT ?,?';
        var par=[req.query.date,beginRow,rowPerPage];
    }

    data = await con.query(sql,par);
    
    model.list = data;
    model.currentPage=currentPage;
    model.lastPage = lastPage;

    sql ='select target_temp from target_temp where id =?';
    target_temp = await con.query(sql,["test_user"]);

    con.release();
    res.render('data',{model:model,target_temp:target_temp});
  
  });
module.exports = router;