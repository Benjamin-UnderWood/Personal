var addLoadEvent = function(func) {
        var oldonload = window.onload;
        //将已有的保存，如果已有
        if (typeof window.onload !== 'function' ) {
            window.onload = func;
        } else {
            window.onload = function(){
                oldonload();
                func();
            }
        }
    }
addLoadEvent(prepareLinks);

function prepareLinks() {
    var links = document.querySelectorAll('.dir-item a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return popUp(this.href) ? false : true;
        }
    }
}

var popUp = function(winURL) {
    window.open(winURL,'_blank');
    // window.open(winURL,"popup","resizable,scrollbars,status");
    // 这种是弹出 新窗口
            return true;
        }
