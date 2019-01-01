
// window.onload = prepareGallery; 改写成 以下 更通用的
function addLoadEvent(func) {
    var oldonload = window.onload ;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
// 主函数
function prepareGallery() {
    //可以写成 var prepareGallery = function() {}
    if(!document.getElementsByTagName){
        return false;
    }
    if(!document.getElementById){
        return false;
    }
    if(!document.getElementById('imagegallery')){
        return false;
    }
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(){
            return showPic(this) ? false : true;
            //如果只改成 return false ；那么点击，图片不切换；
            // return showPic(this) ? false : true;
            // 等价于 return !showPic(this);
            /*等价于showPic(this);
            return false;（不能平稳退化）   */
        }
    }
}

function showPic(whichpic){
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href")
    var placeholder = document.getElementById("placeholder")
    if(placeholder.nodeName !='IMG') return false;
    //确保 占位符 是张 存在的 图片
    placeholder.setAttribute("src",source);
    // 等价于placeholder.src = source;
    // 老方法 element.value = "the new value"等价于element.setAttribute("value","the new value");
    if (document.getElementById('description')) {
        var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
        // title 存在包括 真有值 和 声明了 title 但未初始化 （undefined）; title不存在，表示没声明（null)
        /*等价于 if (whichpic.getAttribute('title')){
                    var text = whichpic.getAttribute('title')
                }else{
                    var text = '';
                }*/
        // 等价于 var text = whichpic.title ? whichpic.title : '';
        // whichpic.getAttribute("title");等价于whichpic.title
        // 老方法 var value = element.attribute等价于var value = element.getAttribute('attribute')；
        // this.getAttribute('href') 等价于 this.href
        var description = document.getElementById("description")
        if (description.firstChild.nodeType == 3) {
            // 确保 description 是文本
            description.firstChild.nodeValue = text;
        }
        // 等价于 description.innerText = text;
    }
    return true;
};

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.querySelector('#imagegallery')) return false;
    // 创建 img 元素节点
    var placeholder = document.createElement('img');
    // 设置 placeholder 元素节点的属性
    // placeholder.setAttribute('id','placeholder')
    placeholder.id = 'placeholder';
    placeholder.src = 'images/placeholder.jpg';
    placeholder.alt = 'my image gallery';
    // 创建 p 元素节点
    var description = document.createElement('p');
    // 设置 p 元素节点的属性
    description.id = 'description';
    // 创建 p 元素节点的 文本节点
    var desctxt = document.createTextNode('Choose an image.')
    // 把文本节点 追加到 p 元素上
    description.appendChild(desctxt);
    var gallery = document.querySelector('#imagegallery');
    insertAfter(placeholder,gallery);
    insertAfter(description, placeholder);
    // 把新创建的 img 和 p 元素节点 插入文档
    // HTML-DOM 提供的属性 body
    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);
    // document.getElementsByTagName('body')[0].appendChild(placeholder);
    // document.getElementsByTagName('body')[0].appendChild(description);
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
