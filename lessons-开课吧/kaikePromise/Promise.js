//  Promise——承诺
//
//  异步：操作之间没啥关系，同时进行多个操作
//  同步：同时只能做一件事
//
//  同步的话只要前面那个请求没回来，那么你整个页面都会被卡死，什么也干不了；同步代码简单
//  异步优势，同时完成多个操作，相互之间不干扰；缺点：代码更复杂。
//
//
// 异步
ajax('/banners', function(banner_data){
	ajax('/hotItems', function(hotitem_data){
		ajax('/sides', function(side_data){
			ajax('/sides', function(side_data){

			}, function(){
				alert('读取失败')
			})
		}, function(){
			alert('读取失败')
		})
	}, function(){
		alert('读取失败')
	})
}, function(){
	alert('读取失败')
});

// 同步：
// let banner_data = ajax_async('/banners');
// let hotitem_data = ajax_async('/hotItems');
// let side_data = ajax_async('/sides');
// let banner_data = ajax_async('/banners');
//
// 先走完一个数据返回回来了，再走下一个，再走下一个
// --------------------------------------------------------------------------------
//
// 像同步一样写页面，像异步一样不要卡东西
// Promise —— 消除异步操作
//     *用同步一样的方式，来书写代码
//
// Promise到底怎么用

// Promise.all([
//     $.ajax({url: 'data/arr.txt', dataType: 'json'}),
//     $.ajax({url: 'data/json.txt', dataType: 'json'})
// ]).then(function(results){
//     let [arr, json] = results;
//     alert('成功了')
//     console.log(arr, json)
// }, function(){
//     alert('失败了')
// })
Promise.all([
	$.ajax(),
	$.ajax()
	// 这里可以放很多很多个ajax请求
]).then(results => {
	// 对了
}, err => {
	// 错了
});

// --------------------------------------------------------------------------------

// Promise.all  // all 是一个一个都得成功; 与的关系
// Promise.race
// 竞速；类似于这里有五个一样的资源，先读到哪个算哪个；谁先来了用谁，失败了也没关系可以忽略

// Promise.race([
//     $ajax({url:'http://a2.taobao.com/data/users'}),
//     $ajax({url:'http://a15.taobao.com/data/users'}),
//     $ajax({url:'http://a3.taobao.com/data/users'}),
//     $ajax({url:'http://a7.taobao.com/data/users'}),  // 这些是不同的负载点
//     // 我不能保证这几台 lvs都活着，
// ])

// 用处很小，因为我得同时发出很多个请求这本身也是对资源的一种消耗，没有意义
//
//
// --------------------------------------------------------------------------------
// 前端里面主要是异步交互属于异步范畴的
// Promise 也有它自己的问题
