var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var pool = require('../model/db_connect');
var btoa = require('btoa');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.get('/data_print', async function (req, res) {
    var par=[];
    
    let currentPage =1;
    let today = new Date();   

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    let current_date = year+"-"+month+"-"+date;

    if(req.query.date!==undefined){
        current_date = req.query.date;
    }

    if(req.query.current_page!==undefined){
        currentPage = req.query.current_page;  
    }
    console.log("current_date "+current_date);
    let rowPerPage = 20;    // 페이지당 보여줄 글목록 : 10개
    let beginRow =(currentPage-1)*rowPerPage;
    let model = {};

    if(req.query.date===undefined){ // 데이터가 몇개인지 불러옴
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
        var par=[current_date,beginRow,rowPerPage];
    }

    data = await con.query(sql,par);
    
    sql ='select target_temp from target_temp where id =?';
    target_temp = await con.query(sql,["test_user"]);
    console.log(typeof(target_temp[0]));
    if(target_temp[0]===undefined){
        target_temp=0;
    }else{
        target_temp = target_temp[0].target_temp;
    }
    con.release();

    model.list = data;
    model.currentPage=currentPage;
    model.lastPage = lastPage;

    var getTagValue = function (userName, passWord, projName, tagList) {
        //var userPass = window.btoa(userName);
        var data = userName + ":" + passWord
        var userPass = btoa(data)
        console.log("---------------------")
        console.log(userPass)
        var dataParam = new Object();
        var tagObjectList = new Array();

        for (var i = 0; i < tagList.length; i++) {
            var tagObject = new Object();
            tagObject["Name"] = tagList;
            tagObjectList.push(tagObject);
        }


        var url = "http://localhost/WaWebService/Json/GetTagValue/" + projName;
        dataParam["Tags"] = tagObjectList;

        var oReq = new XMLHttpRequest();
        oReq.open('POST', url);
        oReq.setRequestHeader("Authorization", "Basic " + userPass);
        oReq.setRequestHeader("Accept", "application/json");
        oReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        oReq.send(JSON.stringify(dataParam));
        oReq.addEventListener('load', function () {
            var result = JSON.parse(oReq.responseText);
            console.log(result.Values[0].Value);  
            res.render('data',{model:model,current_date:current_date,target_temp:target_temp,current_temp:result.Values[0].Value});
            
        })
    }
    getTagValue('admin', 'vetec1', 'test', 'temp');



  
  });
module.exports = router;