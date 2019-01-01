var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 路由：将不同的请求，分配给相应的处理函数
// （1）path 方法，即直接填入路由的相对路径

module.exports = router;
