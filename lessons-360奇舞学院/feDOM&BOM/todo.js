// insert 功能
// 复选框选择后，在其后面增加行；若没选择，则默认在最后增加行
// delete 功能
// 复选框选择后，删除
// update 功能
// 复选框选择后，更新
const [inserBtn, deleteBtn, updateBtn]
    = Array.from(document.querySelectorAll('#buttons button'));

const datalist = document.getElementById('datalist');
const rowtext = document.getElementById('rowtext');

function getAllCheckedRows() {
    return Array.from(datalist.querySelectorAll('li input:checked'))
    .map(el => el.parentNode.parentNode);
}

function createNewRow() {
    var row = document.createElement('li');
    row.innerHTML = `<label><input type="checkbox"/>${rowtext.value}</label>`;
    row.style.opacity = 0; // 增加这一条用于淡入
    return row;
}

inserBtn.addEventListener('click', evt=>{
    var checkedRows = getAllCheckedRows();
    if(checkedRows.length) {
        console.log(checkedRows.length)
        checkedRows.forEach(row=> {
            var newRow = createNewRow();
            row.insertAdjacentElement('afterend', newRow);
            fadeIn(newRow, 100) // 淡入效果
        });
    } else {
        datalist.appendChild(newRow);
        fadeIn(newRow, 100) // 淡入效果
    }
});

// 辅助函数
function fadeIn(element, speed){
    if(element.style.opacity !== '1') { // style 只能访问嵌套在元素中的样式; 属性加引号
        var speed = speed || 30 ;
        var num = 0;
        var st = setInterval(function(){
            num++;
            element.style.opacity = num / 10;
            if(num >= 10) {
                clearInterval(st);
            }
        }, speed);
    }
}

// 添加事件 选中复选框 delete 和 update 按钮生效
function buttonEffect() {
    var inputs = datalist.querySelectorAll('li input')
    inputs.forEach(input=>{
        input.addEventListener ('click', evt=>{
            var checkedRows = getAllCheckedRows();
            if(checkedRows.length) {
                document.querySelectorAll('#buttons button').forEach(button=>{
                    if(button.disabled == true)
                    // button.removeAttribute('disabled');
                    button.disabled = false;
                })
            } else {
                document.querySelectorAll('#buttons button').forEach(button=>{
                    if(button.innerText != 'insert'){// 将insert除在外
                        button.setAttribute('disabled', 'disabled'); 
                    }
                })
            }
        });
    })
}

addLoadEvent(buttonEffect)

// 辅助函数
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

deleteBtn.addEventListener('click', evt=>{
    var checkedRows = getAllCheckedRows();
    if(checkedRows.length) {
        checkedRows.forEach(row=>{
            // row.remove();
            fadeOut(row, 100); // 淡出效果
        });
    }
});

// 辅助函数
function fadeOut(element, speed){
    if(element.style.opacity !== '0') {
        var speed = speed || 30 ; // speed,默认为30，之后可自由修改
        // 如果有给speed赋值那就是 speed，如果没有就是 30
        var num = 10;
        var st = setInterval(function(){
            num--;
            element.style.opacity = num / 10 ;
            if(num <= 0) {
                clearInterval(st);
                element.remove(); // 渐变结束之后移除元素；需在回调函数里删，不能直接在原函数删
                // 若是在原函数 39 行删除，那么没等回调函数执行完就已经移除了！！！
            }
        }, speed);
    }
}

updateBtn.addEventListener('click',evt=>{
    var checkedRows = getAllCheckedRows();
    if(checkedRows.length){
        document.querySelector('#updateBtn').disabled = '';
        checkedRows.forEach(row=>row.childNodes[0].childNodes[1].textContent = rowtext.value);
    }
})
