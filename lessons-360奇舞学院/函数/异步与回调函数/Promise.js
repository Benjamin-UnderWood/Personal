// 传统回调嵌套
setTimeout(function(){
    console.log('step1');
    var startTime = Date.now();
    setTimeout(function(){
        console.log('step 2');
        console.log(Date.now() - startTime);
        setTimeout(function(){
            console.log('step 3');
            console.log(Date.now() - startTime);
        }, 1500);
    }, 1000);
}, 500);

// Promise
function wait(time){
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

// ES6 实现
wait(5000).then(function(){
    console.log('step 4');
    return wait(1000);
}).then(function(){
    console.log('step 5');
    return wait(1500);
}).then(function(){
    console.log('step 6');
});

// ES7 解决方法
// (async function(){
//     await wait(5000);
//     console.log('step 4'); //在前面基础上再加 2000
//     await  wait(1000);
//     console.log('step 5');
// })();