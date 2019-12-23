var pool = require('./db_connect');
var express = require('express');
var router = express.router;

module.exports= function() {
        return {
            select: function (callback) {
                pool.getConnection(function (err, con) {
                    var sql = 'select * from bwanalogtable where tagname="temp" ORDER BY LogDate DESC LIMIT 10';
                    result = con.query(sql);
                    console.log();
                    con.release();
                    return result;
                });
            }, pool: pool,


            insert: function (target_temp, callback) {
                pool.getConnection(function (err, con) {
                    var sql = "insert into target_temp values('test_user',?)";
                    con.query(sql, [target_temp], function (err, result) {
                        con.release();
                        if (err) return callback(err);

                    });
                });
            },


            get: function (callback) {
                pool.getConnection(function (err, con) {
                    var sql = 'select id from member where id=? and password?';
                    con.query(sql, [id, password], function (err, result, fields) {
                        con.release();
                        if (err) return callback(err);

                        callback(null, result);

                    })
                })
            },

            get_user_temp : function(id,callback){
                pool.getConnection(function(err, con){
                    var sql ='select target_temp from target_temp where id =?';
                    con.query(sql,["test_user"],function(err,result){
                        con.release();
                        if(err) return callback(err,result);

                        callback(null,result);
                        return result;
                    })
                })
            }

        }
}
