var log = function() {
    console.log.apply(console,arguments);
}
// 辅助函数
// 由于多次用到这个过程的代码，因此把它抽象成函数
var insertTodo = function(todo) {
    // 添加到页面中
    var todocontainer = document.querySelector('#id-div-container');
    var t = templateTodo(todo);
    todocontainer.insertAdjacentHTML('beforeend',t);
}

var templateTodo = function(todo){
    var t = `
        <div class="todo-cell">
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <button class='todo-edit'>编辑</button>
            <span class="todo-label" contenteditable='false'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    // 要返回 t 要不然函数不会返回东西；
    return t;
}

// 时间函数
function timetrans(){
    var date = new Date();//(date*1000);//如果date为13位不需要乘1000
    var Y =  date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}

var indexOfElement = function(element) {
    var parent = element.parentElement;
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i];
        if (e === element) {
            return i;
        }
    }
}

// 保存 todoList; 保存的是 todo(包括 task 和 time);不包括按钮，按钮是后来生成的
// 注意只保存 我们输入的 信息；
var saveTodos = function() {
    var s = JSON.stringify(todoList);
    localStorage.todoList = s;
}
// 加载 todoList
var loadTodos = function() {
    var s = localStorage.todoList;
    return JSON.parse(s);
}

// 程序加载后，加载 todoList 并且添加到页面中
var initTodos = function() {
    todoList = loadTodos();
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        insertTodo(todo);
    }
}


// 绑定事件
// 添加按钮 绑定事件
var bindEventAdd = function() {
    var todobutton = document.querySelector('#id-button-add');
    // 绑定事件
    todobutton.addEventListener('click',function(event){
        // 得到输入的值
        var todoinput = document.querySelector('#id-input-todo');
        // var todo = todoinput.getAttribute('value');
        // 用 getAttribute 得不到输入的值(因为一开始没输入)
        var task = todoinput.value;
        // 用对象来保存,相关联的 几个值
        var todo = {
            'task': task,
            'time': timetrans()
        }
        todoList.push(todo);
        saveTodos();
        insertTodo(todo);
    })
}

// 输入框 回车 绑定事件
var bindEventinputEnter = function() {
    var todoinput = document.querySelector('#id-input-todo');
    todoinput.addEventListener('keydown',function(event){
        // var todo = todoinput.getAttribute('value');
        // 用 getAttribute 得不到输入的值(因为一开始没输入) DOM 树不完整
        var task = todoinput.value;
        // 用对象来保存,相关联的 几个值
        var todo = {
            'task': task,
            'time': timetrans()
        }
        if (event.key === 'Enter'){
            log('keydown', event, event.target)
            log('按了回车')
            // event.preventDefault();
            todoList.push(todo);
            saveTodos();
            insertTodo(todo);
        }
    })
}

var bindEventButton = function() {
    // 事件委托 绑在父节点上 再去找响应事件的 子元素，而不必每次都绑一次子元素
    var todocontainer = document.querySelector('#id-div-container');
    todocontainer.addEventListener('click',function(event){
        log('container click', event, event.target)
        var target = event.target;
        // 如果 是 todo-done  按钮触发的
        if (target.classList.contains('todo-done')) {
            log('done')
            var todoDiv = target.parentElement;
            // toggleClass(todoDiv, 'done');
            var span = todoDiv.querySelector('.todo-label');
            span.classList.toggle('done');
        // 如果 是 todo-delete 按钮触发的
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
            var todoDiv = target.parentElement;
            // 第几条 todo-cell
            var index = indexOfElement(target.parentElement);
            // var index = indexOfElement(target); 不是 target 的 index;
            // 而是 todo-cell(target.parentElement) 的 index
            log('delete index', index);
            todoDiv.remove();
            // 把元素从 todoList 中 remove 掉
            todoList.splice(index,1);
            saveTodos();
        // 如果 是 todo-edit 按钮触发的
        } else if (target.classList.contains('todo-edit')) {
            // 点击 编辑 按钮后，让 todo 可以编辑
            log('edit')
            var todoDiv = target.parentElement;
            var span = todoDiv.children[3];
            span.setAttribute('contenteditable','true');
            // span.contenteditable = true
            // span.focus()
        }
    })
}

var bindEventEnter = function() {
    var todocontainer = document.querySelector('#id-div-container');
    todocontainer.addEventListener('keydown',function(event){
        log('container click', event, event.target);
        var target = event.target;
        if (event.key === 'Enter') {
            log('keydown', event, event.target)
            log('按了回车')
            // 失去焦点
            target.blur();
            // 阻止默认行为的发生,不插入回车
            event.preventDefault();
        }
    })
}

var bindEventBlur = function() {
    var todocontainer = document.querySelector('#id-div-container');
    todocontainer.addEventListener('blur',function(event){
        log('blur', event, event.target);
        log('失去焦点了')
        var target = event.target;
        if (target.classList.contains('todo-label')) {
            // 失焦后 让 span 不可编辑
            target.setAttribute('contenteditable', 'false')
            //  更新 todo
            var index = indexOfElement(target.parentElement);
            log('update index', index);
            todoList[index].task = target.innerHTML;
            saveTodos();
        }
    },true)
    // blur 事件委托 需要加 addEventListener 的第三个 参数 才有效; true 捕获
    // 默认是 false; 冒泡
}

// 绑定的所有函数
var bindEvents = function() {
    // 添加 todo
    bindEventAdd();
    // input 输入内容 后，按回车保存
    bindEventinputEnter();
    // 完成按钮和删除按钮
    bindEventButton();
    // 编辑todo后，按回车 失去焦点
    bindEventEnter();
    // 文本框失去焦点后保存 todo
    bindEventBlur();
}

// 创建 todoList 来存储 todo 事项
var todoList = [];

var __main = function() {
    // 绑定事件
    bindEvents();
    // 程序加载后，加载 todoList 并且添加到页面中
    initTodos();
}
__main();
