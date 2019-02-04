// 按钮避免重复点击, ex 提交表单, 如果重复点击的话会重复提交数据, 
// 因此需要每隔一段时间点击有效, 设置节流的函数
const btn = document.getElementById('btn');

function throttle(fn, wait) {
    var timer;
    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => timer=null, wait); // 点击后, 在一段时间内再次点击失效; wait一段时间后再次点击有效
            return fn.apply(this, args);
        } 
    }
}

// 按钮每 500ms 一次点击有效
btn.onclick = throttle(function() {
   console.log('button clicked'); 
}, 500);
// 不管点击btn多快, 都是每隔500ms响应一次(执行函数), 这样可以达到限流