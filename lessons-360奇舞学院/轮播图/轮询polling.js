const express = require('express');
const app = express();

function generateCode() {
	return ('' + Math.random()).slice(-8);
}

let code = generateCode();
let previousCode = code; // 让先前的也能访问到

setInterval(() => {
    code = generateCode();
    // 延迟两秒更新， 防止网络延迟，在2秒内新旧两个code都可用
    setTimeout(() => previousCode = code, 2000);
}, 10000);

// 定义一个路由的基本格式
// app.METHOD(PATH, HANDLER)
// app是express的实例
// METHOD 是HTTP请求的方法，PATH是服务器上的路径，HANDLER是在路由匹配时执行的函数
app.get('/qrcode', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://c.h5jun.com'); // CORS头部信息
    res.send({code});
});

// 使用路由参数
app.get('/check/:code', function(req, res) {
    let checkCode = req.params.code;
    let msg = '验证不通过';
    if(checkCode === code || checkCode === previousCode) {
        msg = '验证通过';
    }
    res.send(msg);
});
// 访问地址 http://localhost:3000/check/12312324

app.listen(3000);

