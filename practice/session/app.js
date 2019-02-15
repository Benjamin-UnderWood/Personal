// （1）引入相关模块并设置中间件，设置模板引擎：
var express = require("express");
var app = express();
var user = require("./user.json");//引入模拟数据库

//引入body-parser模块并设置中间件，以便用req.body来获取post的传值
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//引入express-session模块并设置中间件
var session = require("express-session");
app.use(session({
	secret : "nihao",  //加密session，随便写
	cookie : {maxAge : 60*1000*30}, //设置过期时间
	resave : true,  //强制保存session 默认为 true，建议设置成false
	saveUninitialized : false ////强制将未初始化的session存储 默认为true，建议设置成true
}));
app.set("view engine", "ejs");//设置模板引擎为ejs，默认从views目录下查找ejs文件

// （2）设置用户登录页面路由
app.get("/login", function(req, res){
	res.render("login.ejs"); //渲染登录页面
});
app.post("/loginDo", function(req, res){
	var usernaem = req.body.username;
	var password = req.body.password;
	if( usernaem === user.username || password === user.password){
		req.session.userinfo = usernaem; //设置session，表示用户处在的登录状态
		//app.locals对象用于将数据传入所有的渲染ejs模板中，用<%=username%>接收
		req.app.locals["username"] = usernaem;
		res.redirect("/product");
	}else{
		res.send("<script>alert('登陆失败！');location.href='/login';</script>");//用户名或密码不正确
	}
});

// （3）使用session判断用户是否是登录状态，true则允许访问商品页面/false则跳转到登录页面
app.use( function(req,res,next){
	if( req.session.userinfo ){
		next();
	}else{
		res.send("<script>alert('您还没有登录，请先登录！');location.href='/login';</script>");
	}
} );

// （4）设置商品页面路由，用户若想访问必需通过第三步的拦截
app.get("/product", function(req, res){
	res.render("product.ejs"); //渲染商品页面
});//退出登录
app.get( "/out", function( req, res ){
	req.session.destroy(); //销毁session，退出登录
	res.redirect("/login");
} );
//设置端口号
app.listen(8000, function(){
	console.log("success");
});

// 用户若没有登录直接访问“商品页面（/product）” ，就会进行拦截提示并跳转到“登录页面（/login）”，只有登录以后才能访问“商品页面”。