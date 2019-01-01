// 用户输入信息
// 输入用户名等信息
var account = {
    'username': 'hh281987075@qq.com',
    'password': '19931221h',
    'captch': 'female'
}

// 输入请求相关的信息
var xhr = {
    method: 'POST',
    url: '/login',
    contentType:  'application/x-www-form-urlencoded',
    // data: data,
    callback: function(response) {
        // do something using response
        // 登录请求成功后，页面跳转
        window.location.href = '/';
    }
}

// 获取表单；类名由具体应用决定
var form = document.getElementById('lzform');
var username = document.querySelector('.item-account input');
var password = document.querySelector('.item-passwd input');
var captcha = document.querySelector('.item-captcha input');

// 将用户名等插入表单
username.value = account.username;
password.value = account.password;
captcha.value = account.captch;


// 自定义 API 接口
var api = {
    // 自定义的ajax
    ajax: function(request) {
        /**
         *request 是一个 object, 有如下属性
        *method, 请求的方法, string
        *url, 请求的路径, string
        *data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        *callback, 响应回调, function
        */
        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, true);

        if (request.contentType !== undefined) {
            xhr.setRequestHeader('Content-Type', request.contentType);
        }
        xhr.onreadystatechange = function(event) {
            if(xhr.readyState === 4) {
                // 登录响应成功的回调
                request.callback(xhr.response);
            }
        }

        if (request.method === 'GET') {
            xhr.send();
        } else {
            xhr.send(request.data);
        }
    },

    // 请求参数序列化, 查询信息传入 send
    seria: function() {
        // 当 ContentType:  'application/json'
        if (xhr.contentType === 'application/json') {
            // 序列化数据
            var data = JSON.stringify(account);
            // 设置 xhr 的 data 属性
            xhr.data = data;
        }

        // 当 Content-Type: 'application/x-www-form-urlencoded'
        if (xhr.contentType === 'application/x-www-form-urlencoded') {
            // 序列化表单
            var data = serialize(form);
            // 设置 xhr 的 data 属性
            xhr.data = data;
        }
    }
}

// 辅助函数 表单序列化
var serialize = function(form) {
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

// 主函数
var  _main = function() {
    // 参数序列化
    api.seria();
    // 调用ajax
    api.ajax(xhr);
}

// 调用
_main();






