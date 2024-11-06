var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('register', function(req, res, next) {
    console.log('发送请求成功');
    
//   res.render('index', { title: 'Express' });
});

module.exports = router;
