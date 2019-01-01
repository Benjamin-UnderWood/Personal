function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement
    || !document.createTextNode) return false;
    // 取得所有缩略词
    var abbreviations = document.getElementsByTagName('abbr');
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    // 遍历这些缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        // var definition = abbreviations[i].getAttribute('title')
        var definition = current_abbr.title;
        // var key = abbreviations[i].lastChild.nodeValue;
        var key = current_abbr.innerText;
        // 将两个要保存到数组的变量的值，一个作为数组元素的下标(键)，另一个作为值的方式
        // 来同时保存这两个值
        defs[key] = definition;
    }
    // 创建定义列表
    var dlist = document.createElement('dl');
    // loop through the definitions
    for(key in defs) {
        // 创建 dt 元素；标题 = 元素节点 + 文本节点
        var definition = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建 dd 元素；定义描述 = 元素节点 + 文本节点
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        // 把新创建的 dt 和 dd 元素追加到稍早创建的 dl 元素上
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);

    }
    // 创建标题
    var header = document.createElement('h2');
    var header_text = document.createTextNode('Abbreviations')
    header.appendChild(header_text);
    // 把标题、定义了列表添加到页面主题
    // document.getElementsByTagName('body')[0]
    // document.body.appendChild(header);
    // document.body.appendChild(dlist);
    var para = document.getElementsByTagName('p');
    var Lastpara = para[para.length-1];
    insertAfter(header, Lastpara);
    insertAfter(dlist, header);
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
// window.onload = displayAbbreviations;
addLoadEvent(displayAbbreviations);

function displayCitations() {
    if(!document.getElementsByTagName || !document.createElement
    || !document.createTextNode) return false;
    // 取得所有引用
    var quotes = document.getElementsByTagName('blockquote');
    // 遍历引用
    for (var i = 0; i < quotes.length; i++) {
        // 如果没有 cite 属性，继续循环
        if(!quotes[i].getAttribute('cite')) continue;
        // 保存 cite 属性
        var url = quotes[i].getAttribute('cite');
        // 找出 blockquote 元素里的所有元素节点 (不包含文本节点(换行符))
        var quoteChildren = quotes[i].getElementsByTagName('*');
        if(quoteChildren.length < 1) continue;
        // 取得引用中的最后一个元素节点
        var elem = quoteChildren[quoteChildren.length - 1];
        // 创建标记
        var link =document.createElement('a');
        var link_text = document.createTextNode('source');
        link.appendChild(link_text);
        link.setAttribute('href',url);
        var superscript = document.createElement('sup')
        superscript.appendChild(link);
        // 把标记添加到引用中的最后一个元素节点
        elem.appendChild(superscript);
    }
}
addLoadEvent(displayCitations);

function displayAccesskeys() {
    if(!document.getElementsByTagName || !document.createElement
    || !document.createTextNode) return false;
    // 取得文档中的所有链接
    var links = document.getElementsByTagName('a');
    // 创建一个数组，保存访问键
    var akeys = new Array();
    // 遍历链接
    for (var i = 0; i < links.length; i++) {
        var current_link = links[i];
        // 如果没有 accesskey 属性，继续循环
        if(!current_link.getAttribute('accesskey')) continue;
        // 取得 accesskey 的值 1 4 9
        var key = current_link.getAttribute('accesskey');
        // 此处 current.accesskey 无效；
        // 取得链接文本
        var text = current_link.innerText;
        // 添加到数组 用对象 更好吧
        akeys[key] = text;
    }
    // 创建列表
    var list =document.createElement('ul');
    // 遍历访问键
    for(key in akeys) {
        var text = akeys[key];
        // 创建放到列表项中的字符串
        var str = key + ':' + text;
        // 创建列表项
        var item = document.createElement('li');
        var item_text = document.createTextNode(str);
        item.appendChild(item_text);
        // 把列表项添加到列表中
        list.appendChild(item);
    }
    // 创建标题
    var header = document.createElement('h3');
    var header_text = document.createTextNode('Accesskeys');
    header.appendChild(header_text);
    // 把标题、 列表添加到页面主体
    document.body.appendChild(header);
    document.body.appendChild(list);
}
addLoadEvent(displayAccesskeys);
