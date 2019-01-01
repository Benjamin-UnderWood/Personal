function getNewContent() {
    var request = getHTTPObject();
    if (request) {
        // 关键句子
        request.open('GET','example.txt',true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                alert('Response Received');
                var para = document.createElement('p');
                var txt = document.createTextNode(request.responseText);
                // 抓取了 服务器 的txt ，并用来构建我们 p 节点中的文本
                para.appendChild(txt);
                document.getElementById('new').appendChild(para)
            }
        };
        request.send(null);
    } else {
        alert('Sorry, your browser doesn\'t support XMLHttpRequest');
    }
    alert('Function Done');
}
addLoadEvent(getNewContent);
