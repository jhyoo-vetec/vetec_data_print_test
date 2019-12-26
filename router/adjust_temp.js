var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var pool = require('../model/db_connect');

router.get('/adjust_temp',async function(req,res){
    con = await pool.getConnection();
    id = "test_user";
    query = "select * from target_temp where id = ?";
    con.release();
    before_temp = await con.query(query,[id]);
    res.render('adjust_temp',{before_temp:before_temp[0].target_temp});

});

module.exports = router;