var express = require('express');
var router = express.Router();



router.post('/login_ok', function (req, res) {
    console.log("fds");   
    console.log(req)
    var id = req.body.id;
    console.log(id);
    // id pw 확인 
  });
module.exports = router;


