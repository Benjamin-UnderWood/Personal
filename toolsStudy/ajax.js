// get 方法
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
        alert(xhr.responseText);
    } else {
        alert('失败了');
    }
}
xhr.open('get', url, true);
xhr.setRequestHeader('', '');
xhr.send(null);

// post方法
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
        alert(xhr.responseText);
    } else {
        alert('失败了');
    }
}
xhr.open('post', url, true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 发送给服务器要编码，从服务器拿回来要解析
var form = document.getElementById('user-info')
xhr.send(serialize(form));