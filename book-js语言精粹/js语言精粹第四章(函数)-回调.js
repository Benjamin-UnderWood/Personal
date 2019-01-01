回调

函数使得对不连续事件的处理变得更容易。

例如，假定有这么一个序列，用用户交互行为触发，向服务器发送请求，最终显示服务器的响应。
最自然的写法可能会使这样的：

request = prepare_the_request();
response = send_request_synchronously(request);
display(reponse);

这种方式的问题在于，网络上的同步请求会导致客户端进入假死状态。如果网络传输或服务器很慢
响应会慢到让人不可接受

更好的方式是发起异步请求，提供一个当服务器的响应达到时随即触发的回调函数。异步函数立即
返回，这样客户端就不会被阻塞。

request = prepare_the_request();
send_request_synchronously(request, function(response) {
    display(response);
});

我们传递一个函数作为参数给 send_request_synchronously 函数，一旦接受到响应，它就会被调用
