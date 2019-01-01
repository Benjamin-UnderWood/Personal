// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

var URL = require('url'); // 新增
var User=require('./user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond');
});


router.get('/getUserInfo', function(req, res, next) {
  var user = new User();
  var params = URL.parse(req.url, true).query;
  // 服务器使用时要对 URL 进行解析；query 为方法
  // 访问时要 encodeURIComponent 进行编码, 才能放到URL的末尾
if(params.id == '1') {
  user.name = "ligh";
  user.age = "1";
  user.city = "北京市";
}else{    
  user.name = "SPTING";
  user.age = "1";
  user.city = "杭州市";
}
var response = {status:1,data:user};
res.send(JSON.stringify(response));
});
// 访问地址 http://localhost:3000/users/getUserInfo?id=1
// ? 后面的是 params; 查询字符串
module.exports = router;
