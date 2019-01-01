var ajax = function(request) {
    /*
    request 是一个 object, 有如下属性
    method, 请求的方法, string
    url, 请求的路径, string
    data, 请求发送的数据, 如果是 GET 方法则没这个值, string
    callback, 响应回调, function
    */
    var xhr = new XMLHttpRequest()
    xhr.open(request.method, request.url, true)

    // 如果有 Content-Type 就设置; 没有就不设置(看传入的数据决定)
    if (request.contentType !== undefined) {
        xhr.setRequestHeader('Content-Type', request.contentType)
    }
    xhr.onreadystatechange = function(event) {
        if(xhr.readyState === 4) {
            request.callback(xhr.response)
        }
    }

    // 往 send 里放置请求体
    if (request.method === 'GET') {
        xhr.send()
    } else {
        xhr.send(request.data)
    }
}

// 当 contentType:  'application/json'
// if (xhr.contentType === 'application/json') {
//     var account = {
//         'username': '',
//         'password': ''
//     }
//     var data = JSON.stringify(account);
// }

// 当Request Headers(请求报文)头部 Content-Type: application/x-www-form-urlencoded
// if (xhr.contentType === 'application/x-www-form-urlencoded') {
    // 不能在这里加判断，因为此时xhr(只有变量提升)值为undefined；又不能把 xhr 放到它前面
    // 因为 xhr 里面的 data 是在下面这一连串之后才有的；
    // 类似于 console.log(a) ;var a =1
    var account = {
        'username': 'hh281987075@qq.com',
        'password': '19931221h',
        'captch': 'female'
    }
    
    var form = document.getElementById('lzform');
    // 不一定是邮箱；可能是手机号 因此不能用下面这样
    // var form_email = document.getElementById('form-email');
    var username = document.querySelector('.item-account input');
    var password = document.querySelector('.item-passwd input');
    var captcha = document.querySelector('.item-captcha input');
    // 可选
    username.value = account.username;
    password.value = account.password;
    captcha.value = account.captch;
    
    var data = serialize(form);
    // console.log(data);
// }

function serialize(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ?
                                    option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ?
                                    option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" +
                                encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined: //字段集
            case "file": //文件输入
            case "submit": //提交按钮
            case "reset": //重置按钮
            case "button": //自定义按钮
                break;
            case "radio": //单选按钮
            case "checkbox": //复选框
                if (!field.checked) {
                    break;
                }
                /* 执行默认操作 */
            default:
                //不包含没有名字的表单字段
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" +
                        encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

var xhr = {
    method: 'POST',
    url: '/login',
    contentType:  'application/x-www-form-urlencoded',
    data: data,
    callback: function(response) {
        // console.log('响应', response)
        window.location.href = '/';
    }
}

ajax(xhr);





