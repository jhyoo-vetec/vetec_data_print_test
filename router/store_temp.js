var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = require('../model/db_sql')();

router.post('/temp_store',function(req,res){
    console.log('store_temp_location');
    console.log(req.body.target_temp);
    sql.insert(req.body.target_temp,function(err,data){
        if(err) console.log(err);
    });
    res.redirect('/data_print');

});
module.exports = router;