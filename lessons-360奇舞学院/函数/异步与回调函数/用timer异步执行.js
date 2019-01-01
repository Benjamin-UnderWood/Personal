const ball = document.getElementById('ball');

ball.addEventListener('click', function(){ // click 也是个 异步
    var startTime = Date.now();

    var tId = setInterval(function(){
        var t = 10 - Math.round((Date.now() - startTime) / 1000); // 10s减去当前经过的时间
        ball.innerHTML = Math.max(t, 0);
        if(t <= 0) clearInterval(tId); // 避免跑过了
    }, 1000);

    ball.className = 'warn'; // 最后三秒中闪烁，然后消失
});