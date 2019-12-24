var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var fs = require('fs');
var router = express.Router();
var mysql = require('mysql');
var dataRouter =require('./router/data.js')
var login_ok = require('./model/login_ok.js')
var store_temp = require('./router/store_temp.js')
var adjust_temp = require('./router/adjust_temp.js');

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {

  fs.readdir('./data', function(error, filelist) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    res.send(html);

  });
});


app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/insert_temp',function(req,res){
  res.render('insert_temp.ejs');
})
app.get('/adjust_temp',adjust_temp);
app.get('/data_print', dataRouter)
app.post('/login_ok', login_ok)
app.post('/temp_store',store_temp)
app.get('/main', function (req, res) {

  res.render('main.html');

  });

  app.listen(3003, function () {
    console.log("client accept port 3003")
  });
