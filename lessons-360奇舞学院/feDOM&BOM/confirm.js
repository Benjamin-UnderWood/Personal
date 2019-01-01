(function repeat() {
   let i = 0;
   let timer = setInterval(function(){
       console.log(++i);
       if (!(i%5 || confirm("继续？"))) clearInterval(timer);
       // 点击确定 confirm 返回 true;点击取消，confirm 返回 false
       // !confirm("继续？") 点击确定 结果 false;点击取消，结果 true;
       // 也就是说 点击确定继续执行回调函数；而点击取消，则触发 clearInterval 函数，不继续执行
   },500)
})()
