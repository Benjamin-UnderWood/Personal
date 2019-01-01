// var URL = require('url'); // 新增
var express = require('express');
var router = express.Router();


// 将生成二维码的函数封装成一个类
// 初始化的时候会去生成一个新的二维码，这个二维码是一个每隔十秒钟刷新一次的一个异步刷新的过程
// 所以写成一个返回 promise
class CodeGenerator{
    constructor(){
        this.code = ('' + Math.random()).slice(-8);
            this.previousCode = code; // 让先前的也能访问到
        let code = generateCode();
        let self = this;

        // 每隔10s刷新一次
        function generateCode() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let code = ('' + Math.random()).slice(-8);
                    resolve(code);

                    slef.previousCode = self.code;
                    setTimeout(() => self.previousCode = self.code, 2000);

                    self.code = code;
                    self.promise = generateCode();
                }, 10000);
            });
        }

        this.promise = generateCode().catch(() => {});
    }

    // generate 返回 promise
    generate() {
        return this.promise;
    }

    check(code){

    }
}

let codeGenerator = new CodeGenerator();

// get 加了一个参数，会把之前已经拿到过的二维码给带上，服务端会判断我拿到过的二维码和我当前的二维码
// 是否是一样的；如果是一样的，那就挂起；如果说是不一样的话，这时候就会把它给返回
app.get('/qrcode/:previous', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://c.h5jun.com');
    // 这个code和那个code是一样的话，就 await codeGenerator;
    // 因为generator是一个promise，如果我await它的话就是在等待，然后把请求给挂起了
    // 直到 generator 的promise结束，新生成一个新的二维码的时候就会返回，把新的二维码返回给客户端
    let clientPrevious = req.params.previous;
    let code = codeGenerator.code;

    if(clientPrevious === code) { // 上一次获取的还没有过期
        code = await codeGenerator.generate();
    }

    // 新的code
    res.send({code});
})

module.exports = router;