// function insertParagraph(text) {
//     var str = '<p>';
//     str += text;
//     str += '</p>'
//     document.write(str);
// }
// var text = 'This is inserted.'
/*window.onload = function() {
    // var testdiv = document.getElementById('testdiv');
    var testdiv = document.querySelector('#testdiv');
    // testdiv.innerHTML = '<p>I inserted <em>this</em> content.</p>'
    // alert(testdiv.innerHTML)
    var para = document.createElement('p');
    // var info = 'nodeName: ';
    // info += para.nodeName;
    // info += ' nodeType: ';
    // info += para.nodeType;
    // alert(info);
    testdiv.appendChild(para);
    // document.getElementById('testdiv').appendChild(document.createElement('p'));
    var txt = document.createTextNode(' Hello world')
    para.appendChild(txt);
}*/
window.onload = function() {
    var para = document.createElement('p');
    var txt1 = document.createTextNode('This is');
    para.appendChild(txt1);
    var emphasis = document.createElement('em');
    var txt2 = document.createTextNode(' my ');
    emphasis.appendChild(txt2);
    para.appendChild(emphasis);
    var txt3 = document.createTextNode('content.');
    para.appendChild(txt3);
    var testdiv = document.querySelector('#testdiv');
    testdiv.appendChild(para);
    // testdiv.innerHTML = '<p>This is <em>my</em> content.</p>'
}
