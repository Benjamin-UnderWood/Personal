// 慢慢点击btn, 每次都生效; 持续快速点击btn, 不生效(防抖), 等点完最后一次后, 只会生效一次
const btn = document.getElementById('btn');

function debounce(fn, delay) {
    var timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay); // delay 是关键; 多少时间delay后函数才响应
    }
}

btn.onclick = debounce(function() {
    console.log('clicked');
}, 300);