// 辅助函数
var log = function() {
    console.log.apply(console,arguments);
}

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
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value) {
    if(!element.className) {
        element.className = value;
    } else {
        var newClassName;
        newClassName = element.className;
        newClassName += ' ';
        newClassName +=  value;
        element.className = newClassName
    }
}




// 突出当前页面链接的显示，同时为几个超链接页面的body元素添加id属性，以支持为每个页面应用不同的样式
function highlightPage(href) {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i=0; i<links.length; i++) {
		linkurl = links[i].getAttribute("href");
		// 将超链接的url和页面当前的url进行比较，以判定这个超链接是否属于当前页面
        // 某个字符串 是否 被包含在 另一个字符串 里,是否是当前 URL 里的 链接 URL
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
            // 将每个页面的链接的 值 赋值给 body 的 id, 用作CSS挂钩，为页面头部应用不同背景图像
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);


// 第十章的 moveElement 函数 辅助函数
function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//在移动位置前先判断下元素的movement属性是否存在有效值，是则代表正在移动中
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	//判断下emem元素是否设置了元素位置的初始值，没有的话则主动指定一个
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	//因为接下来要基于位置进行计算，所以需要先转换为整数
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	//如果已经移动到目标位置，则退出并返回true
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	//设置elem元素的
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	//迭代调用函数自身，一直循环到满足函数开头的退出条件为止
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
// 实现幻灯片功能
function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");

	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);

	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);


// 根据指定id显示相应的section 辅助函数
function showSection(id) {
  var sections = document.getElementsByTagName("section");
  for (var i=0; i<sections.length; i++ ) {
    if (sections[i].getAttribute("id") != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}
// 在article元素中的nav所包含的链接被单击时调用showSection函数
function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  var nav = navs[0];
  var links = nav.getElementsByTagName("a");
  for (var i=0; i<links.length; i++ ) {
    var sectionId = links[i].getAttribute("href").split("#")[1];
    // 确保真的存在 带有相应 id 的 section
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}
addLoadEvent(prepareInternalnav);


// Showpic
function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if (!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);


// 处理表格
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        // 为下一行 做准备
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var container = document.getElementById("content");
  container.appendChild(header);
  container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);


// label 文本被单机， 关联的表单字段就会获得焦点
function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}
addLoadEvent(focusLabels);
// 占位符 填充文本
function resetFields(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    var check = element.placeholder || element.getAttribute('placeholder');
    // defaultValue
    if (!check) continue;
    element.onfocus = function() {
        var text = this.placeholder || this.getAttribute('placeholder');
        if (this.value == text) {
            // this.className = '';
            this.value = "";
         }
    }
    element.onblur = function() {
        if (this.value == "") {
            // this.className = 'placeholder';
            this.value = this.placeholder || this.getAttribute('placeholder');
        }
    }
    element.onblur();
  }
}


// 用户是否输入了内容 (辅助函数)
function isFilled(field) {
    // 通过检查去掉空格之后的 value 属性的 length 属性，
    // 知道 value 中有没有任何字符(不都是字符)
    if (field.value.replace(/ /g, '').length == 0) return false;
    // 这样 field.value.length < 1 这不合理，因为可能全是 空格
    // .replace(/ /g, ''); 书上 可能有问题， replace 默认只替换第一个，需要写成 / 替换内容 /g
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    // 还要确保输入框内的值不是 placeholder (value 与 defaultValue)
    return (field.value != placeholder);
}

// 用户是否输入有效email地址 (辅助函数)
function isEmail(field) {
    // 确保含有 email 格式的 必备两项 @ 和 .
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

// 验证表单
function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
      // 此处 document.querySelector ('form').elements.length 为5
      // <fieldset> <input> <input> <textarea> <input>
    var element = whichform.elements[i];
    if (element.required) {
        // element.required == 'required' 书上有问题
        // $('#email').required 显示的是 布尔值
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.type == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

// 绑定事件 提交表单触发 submit 事件，事件被 onsubmit 事件处理函数拦截
function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function(event) {
        if (!validateForm(this)) return false;
		var article = document.getElementsByTagName('article')[0];
		// 如果submitFormWithAjax函数成功发送了Ajax请求并返回true，则让submit事件处理函数返回false，以便阻止浏览器重复提交表单
		if (submitFormWithAjax(this, article)) return false;
		// 否则，说明submitFormWithAjax没有发送成功Ajax请求，因而让submit事件处理函数返回true，让表单像什么都没有发生一样继续通过页面提交
		return true;
    }
  }
}
addLoadEvent(prepareForms);


// 提交表单 Ajax
// 提升版 XMLHttpRequest (辅助函数)
function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
                catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
                catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
                catch (e) {}
            return false;
        }
    return new XMLHttpRequest();
}

// 添加 loading.gif 图像
function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
    // 创建 loading 图像
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

//
function submitFormWithAjax(whichform,thetarget) {
	// 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像
	// 把表单的值组织成URL编码的字符串，以便通过Ajax请求发送
	// 创建方法为POST的Ajax请求，把表单的值发送给submit.html
	// 如果请求成功，解析响应并在目标元素中显示结果
	// 如果请求失败，显示错误消息

	var request = getHTTPObject();
	if (!request) { return false; }
    // 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像
	displayAjaxLoading(thetarget);
    // 把表单的值组织成URL编码的字符串，以便通过 POST 请求发送到服务器
	var dataParts = [];
	var element;
	for (var i=0; i<whichform.elements.length; i++) {
		element = whichform.elements[i];
		// 将表单元素拼成URL中传递的信息，同时对表单元素的值进行了适用于URL的转码. name???
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	// 将数组内容用 & 拼接起来
	var data = dataParts.join('&');

	// 向原始表单的 action属性指定的处理函数 发起异步POST方式的访问
	request.open('POST', whichform.getAttribute("action"), true);
    // 并在请求中添加头部信息；头部信息杜宇 POST 请求是必需的 表示请求中包含 URL 编码的表单
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 创建处理响应的 onreadystatechange 处理程序
    request.onreadystatechange = function() {
		// 当访问请求处理完成，接收响应也完成后
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				// 注意下面正则中使用了捕获组的定义
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					// 匹配结果是一个数组，第一个数组元素是 responseText中 与整个模式 完整匹配 的部分 (所有)
					// 匹配结果数组的第二个元素（索引为1），是responseText中与捕获组中的模式匹配的部分。(要找的那个)
					// 因为本例中只定义了一个捕获组，所以matches也只包含两个元素。
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};
	request.send(data);
	return true;
};
// 用 fireFox 测试
