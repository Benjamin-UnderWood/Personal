// var URL = require('url'); // 新增
var express = require('express');
var router = express.Router();


function generateCode() {
    let code = ('' + Math.random()).slice(-8);
    return code;
}

let code = generateCode();
let previousCode = code; // 让先前的也能访问到

setInterval(() => {
    code = generateCode();
    // 延迟两秒更新， 防止网络延迟，在2秒内新旧两个code都可用
    setTimeout(() => previousCode = code, 2000);
}, 10000);


router.get('/qrcode', function(req, res, next) {
    res.send({code});
})


// 使用路由参数
router.get('/check/:code', function(req, res) {
    // var params = URL.parse(req.url, true).query;
    let checkCode = req.params.code;
    let msg = '验证不通过';
    if(checkCode === code || checkCode === previousCode) {
        msg = '验证通过';
    }
    res.send(msg);
})

module.exports = router;