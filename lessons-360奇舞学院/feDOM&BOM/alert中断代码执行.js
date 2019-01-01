(function repeat(start, end) {
    let i = start;

    let timer = setInterval(function(){
        console.log(++i);
        if(i === 3) alert(i); // 弹窗 中断代码执行；没有合适断点调试工具时，用alert来中断
        if(i >= end) clearInterval(timer);
    }, 500);
})(0, 10)
