//重复性的东西 需要拿变量接住
//函数定义完了 空一行  函数调用完了 空一行
//注释 一般不在行末 一般新建一行 如果非得跟在后面  也得对齐
var x = 0        //重要配置文件1
var y = 0        //老板配置2
var w = 100      //老板配置3
var h = 75       //pm配置4
//debug 程序出错  程序执行 是一个黑箱
//Console 终端 查看是否有错误
//log 给出程序 留遗迹
log('程序开始了')//看控制台是否显示
var france = function(){
    log('france开始了')//看控制台是否显示，如果不显示，证明函数没被调用
    var x = 0
    var y = 0
    var w = 100
    var h = 75
    var width = w / 3
    log('france width',width,y)//查中间的变量有没有问题，做好标记
    rect(x,y,width,h)
    rect(x+width,y,width,h)
    rect(x+width*2,y,width,h)
}
france()
log('程序结束了')//看控制台是否显示

//自己定义 console.log
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var time1 = new Date().Format("yyyy-MM-dd");
var time2 = new Date().Format("yyyy-MM-dd mm:ss:S");

var log = function() {
    var time2 = new Date().Format("yyyy-MM-dd mm:ss:S");
//掏粪得来的时间函数  js time
    console.log.apply(console,[time2,arguments])
//time有问题 时间和当前时间对不上
}
//80%bug可以通过log解决
//一步一步 分解 去解决问题 而不是通读代码 一年 5-10 万行代码的项目 没法全部通读
//log 看程序能不能运行 最后看能不能 over
//log("",i)可以看i执行的次数，查错 循环
