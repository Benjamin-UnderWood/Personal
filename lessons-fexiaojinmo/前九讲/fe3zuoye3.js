//1 实现一个矩形函数
//x y是矩形的左上角坐标
//w h是宽和高
//函数声明 rect(x,y,w,h)
var rect = function(x,y,w,h) {
  jump(x,y)
  setHeading(0)
  var i = 0
  for (var i = 0; i < 2; i++) {
      forward(w)
      right(90)
      forward(h)
      right(90)
  }
}
rect(0,0,50,50)
//2 实现一个矩形函数
//x y 是矩形中心的坐标
//w h是宽和高
//函数声明 center_rect(x,y,w,h)
var center_rect = function(x,y,w,h){
    var x1 = x - w / 2;
    var y1 = y - h / 2;//注意是减号
    jump(x1,y1)
    setHeading(0)
    rect(x1,y1,w,h)
}
center_rect(0,0,50,50)
//3 实现一个圆形函数
//x y是圆心坐标
//r是半径
//circle(x,y,r)
//提示 我们以正36我们以正36边形为圆
setDelay(0)
var circle = function(x,y,r) {
    var n = 36;
    var c = 2*3.14*r;
    var l = c/n;
    jump(x,y)
    setHeading(0)
    left(90)
    left(360 / n / 2)
    penup()
    forward(r)
    pendown()//确保不会留下中间走过的那条路径
    setHeading(0)
    //循环画正n边形
    var angle = 360 / n;
    for (var i = 0; i < n; i++) {
        forward(l);
        right(angle);
        }
}
circle(0,0,50)
setDelay(0)//控制动画速度，画的很快
//4 实现一个五角星函数
//x y 是五角星横边的左边坐标
//length是一条线的长度
//wujcxy(x,y,length)
var wujcxy = function(x,y,length){
    jump(x,y)
    setHeading(0)
    var n = 5
    var angle = 144
    for (var i = 0; i < n; i++) {
        forward(length)
        right(angle)
    }
}
wujcxy(0,0,100)
//5 实现一个函数画日本国旗
//调用 2 个函数画日本国旗
//一个画背景的白色矩形
//一个画中间的红色圆
//函数声明 japan()
var japan = function() {
    var x = 0
    var y = 0
    var w = 100
    var h = 75
    rect(x, y, w, h);
    //圆心坐标
    var x1 = x + w/2;
    var y1 = y + h/2;
    var r =h / 4;
    circle(x, y, r)
}
japan()
//6 实现一个函数画中国国旗
//调用2个函数画中国国旗
//一个画红色背景
//另一个画五角星（调用五次，不要求角度朝向，只要5个五角星即可）
//函数声明china()
var china = function() {
    wujxcy
}
//7 实现一个函数画法国国旗
var france = function(){
    var x = 0
    var y = 0
    var w = 100
    var h = 75
    var width = w / 3
    rect(x,y,width,h)
    rect(x+width,y,width,h)
    rect(x+width*2,y,width,h)
}
france()
//8 德国国旗 同理
//9 冈比亚国旗
//画德国国旗，再画一个 中点矩形 盖在第二个矩形上 思路很重要
//10 瑞士国旗
根据中点矩形 画两个矩形 避免求坐标点
var switzerland = function() {
    var x = 0
    var y = 0
    var w = 100
    var h = 75
    center_rect(x,y,w,h)
    center_rect(x,y,w/4,h/8)
    center_rect(x,y,w/8,h/4)
}
switzerland()
//11 朝鲜国旗
编程技术是否支持更高效的开发方式 前端改动算快的 比做客户端 windows操作系统，手机qq软件 ，效率高，快
