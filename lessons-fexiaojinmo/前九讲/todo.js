var log = function() {
    console.log.apply(console, arguments)
}

var todoList = [];
// 给 add button 绑定添加 todo 事件 给添加 按钮绑定事件
// 命名一致性 有参数就都有， 没有就都没有(相似事件)
var bindEventAdd = function(){

    // 用来 存东西 默认等于 空；序列化
    var addButton = document.querySelector('#id-button-add')
    addButton.addEventListener('click', function(){
        // 获得 input.value 获得输入框的值、
        var todoInput = document.querySelector('#id-input-todo')
        var task = todoInput.value
        // 生成 todo 对象
        var todo = {
            'task': task,
            'time': currentTime()
            // 对象的 key 是可以不用加 引号 的
        }
        todoList.push(todo);
        saveTodos();
        insertTodo(todo);
    })
}

var bindEventEnter = function() {
    todoContainer.addEventListener('keydown', function(event){
        log('container keydown', event, event.target)
        var target = event.target
        if(event.key === 'Enter') {
            log('按了回车')
            // 失去焦点
            target.blur()
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            log('update index',  index)
            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML
            // 当条数 少于3条的时候,todoList[index].task = target.innerHTML 中
            // 得改成 todoList[index - 1]；因为 index 一直显示2，
            // 当条数是2的时候 ，找不到 todoList[2] 也就是第三条 ；
            // 这里注意 不是很明白，为什么index是个定值----------------------------------
            // todoList.splice(index, 1)
            saveTodos()
        }
    })

}

var bindEventButton = function() {
    // 通过 event.target 的 class 来检查点击的是什么
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('click', function(event){
        log('container click', event, event.target)
        //MouseEvent   {isTrusted: true,...}   <button class='todo-done'>完成</button>
        var target = event.target
        if(target.classList.contains('todo-done')) {
            log('done')
            // 给 todo div 开关一个状态 class
            var todoDiv = target.parentElement
            // 目标事件 的 父元素
            toggleClass(todoDiv, 'done') // 点击事件要做的事(在确认点的事 完成 button 后)
            // 如果 是由 todo-done(完成) 触发的，那就做 完成 的逻辑
            // 我们不需要 具体知道那个 完成被点击了(事件多了，每个事件都有 完成 按钮)
            // 无论 哪个 按钮被点击了 操作的都是哪个按钮的 父元素 ，这条关系是定的
            // 完成 按钮 点击 后，会给其父元素 'todo-cell'div 再增加一个 done 类，
            // 用来 做 我们的 完成事件 的行为：即在 文本上 加横线，或减掉横线
            saveTodos();
            // todo div 状态  还没实现保存-------------
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
            var todoDiv = target.parentElement
            var index = indexOfElement(target.parentElement);
            // 知道 真正发生的事 是自己 ，但不知道自己在 整个容器中的 位置 因此需要indexOfElement函数
            log('delete index', index);
            todoDiv.remove();
            // 把元素从 todoList 中 remove 掉
            todoList.splice(index,1);
            // 每次 移除的 index 打印出来都是 1
            // delete todoList[index]; 删掉 留下 empty ;delete 只是删除元素的值
            // 如果 是由 todo-delete(删除) 触发的，那就做 删除 的逻辑
            // 如果是删除 ，那就直接把 整个父元素给 删除了 remove()
            saveTodos();
        } else if (target.classList.contains('todo-edit')) {
            log('edit')
            var cell = target.parentElement;
            var span = cell.children[3];
            log('span is', span);
            span.setAttribute('contenteditable','true')
            // span.contentEditable = true;
            // 两套 API 一个小写 一个大写
            span.focus();
        }
    })
}

var bindEventBlur = function() {
    log('bind event blur function')
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('blur', function(event){
        log('container blur', event, event.target)
        var target = event.target
        if (target.classList.contains('todo-label')) {
            log('update and save')
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false')
            var index = indexOfElement(target.parentElement);
            // target.parentElement 而不是 target
            todoList[index].task = target.innerHTML;
            saveTodos();
        }
    },true)
    // 事件传递 3个参数 第三个 是true
    // 事件从外往里 传，从里往外 传， 第一阶段处理，还是第二阶段处理
    // true 从外往里传的时候，解决事件；false,从里往外传的时候，解决事件 事件捕获
    // 事件冒泡
}

var insertTodo = function(todo) {
        // 添加到 container 中 有一个父节点 容纳
        var todoContainer = document.querySelector('#id-div-container')
        var t = templateTodo(todo)
        // 这个方法用来添加元素更加方便, 不需要 createElement
        todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <button class='todo-edit'>编辑</button>
            <span contenteditable='false' class = 'todo-label'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    // 这些 原来的 html中没有也行 ，只要<div id="id-div-container"> 容器在 就好
    return t;
}

var bindEvents = function() {
    // 添加 todo
    bindEventAdd();
    // 文本框输入 todo 按回车保存
    bindEventEnter();
    // 完成按钮和删除按钮
    bindEventButton();
    // 文本框失去焦点后保存 todo
    bindEventBlur();
}

var todoContainer = document.querySelector('#id-div-container')

var saveTodos = function() {
    var s = JSON.stringify(todoList);
    localStorage.todoList = s;
}

var loadTodos = function() {
    var s =localStorage.todoList;
    return JSON.parse(s)
    // 注意这里是 s, todoList s todoList;
}

var indexOfElement = function(element) {
    var parent = element.parentElement;
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i];
        if (e === element) {
            // 父元素 是 唯一的 先找到 父元素，再在父元素中遍历 找到 i 使得父元素的子元素等于自己
            return i;
        }
    }
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hours = d.getHours()
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`;
    return timeString;
}

var initTodos = function() {
    todoList = loadTodos();
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        insertTodo(todo);
    }
}

var __main = function() {
    // 绑定事件
    bindEvents()
    // 程序加载后， 加载 todoList 并且添加到页面中
    initTodos()
}

__main();
// 同一个层次下的 函数 互相间不能访问互相的 变量
