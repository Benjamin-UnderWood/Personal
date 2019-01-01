// POST 方法
// 我们可以用 XHR 来模仿表单提交！！！
// 登录页面 发送数据
// 创建 AJAX 对象
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
        // console.log('success', r, `r.status ${r.status}`, r.response);
        window.location.href = '/'
    }
}
// 设置请求方法 POST 和请求地址
xhr.open('POST', '/login', true);
// 设置发送的数据的格式
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 提交表单时的内容类型
// 豆瓣的 <form> 位置
var form = document.getElementById('lzform');
xhr.send(serialize(form));

// 表单提交序列化
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