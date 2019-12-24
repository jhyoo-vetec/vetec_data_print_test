var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../model/db_connect');

router.post('/temp_store',async function(req,res){
    console.log('store_temp_location');
    console.log(req.body.target_temp);
    id="test_user";

    con = await pool.getConnection();

    query = "select target_temp from target_temp where id=?";

    result = await con.query(query,[id]);
    if(result[0] === undefined){
     query = "insert into target_temp values(?,?)";
     await con.query(query,[id,req.body.target_temp]);
    }
    else{
        query = "update target_temp set target_temp =? where id=?";
        await con.query(query,[req.body.target_temp,id]);
    }
    con.release();
    res.redirect('/data_print',{current_temp:1});
    
});
module.exports = router;