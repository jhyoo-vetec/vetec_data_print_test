var express = require('express');
var app = express();
var fs = require('fs');
var router = express.Router();
var mysql = require('mysql');
var dataRouter =require('./router/data.js')


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


app.get('/data_print', dataRouter)


  app.get('/main', function (req, res) {

    res.render('main.html');

  });

  app.listen(3002, function () {
    console.log("client accept port 3002")
  });
