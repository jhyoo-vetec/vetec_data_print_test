var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var pool = require('../model/db_connect');

router.get('/init_temp',async function(req,res){
    id="test_user";
    con = await pool.getConnection();
    query = "delete from target_temp where id=?";
    await con.query(query,[id]);

    res.redirect('/data_print',{current_page:1});
    
});

module.exports=router;