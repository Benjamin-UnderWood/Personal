var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // 对应于 routes 里面的 index.js
var usersRouter = require('./routes/users'); // 对应于 routes 里面的 users.js
var qrcode = require('./routes/polling');

// var qrcode = require('polling.js');// 自己定义的 ----------------
// 可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统。这样我们就可以在一个文件中(routes文件里)专门做路由处理，而在app.js中use这个中间件。 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件放在public文件夹中

// app.use('/', indexRouter); // 默认
app.use('/users', usersRouter); // 当路径里使用了 users 就去 usersRouter 路由;也就是第八行定义的地方
// app.use('/qrcode', qrcode);// 新增; 当访问路径里是这个的时候，那么去qrcode模块找数据(虚拟，非静态)

app.use('/', qrcode); // 修改 让根路由去 qrcode 那里
// app.use('/msgs', msgs); // 自己测试用



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
