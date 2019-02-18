console.log('生效了');
// 把弹出框按钮抽象成一个行为, 而不是封装成一个组件
var btns = document.querySelectorAll('.btn');

// 设置弹出框的方法, setShowDialogBehvior
function setShowDialogBehvior(subjects) {
    var showDialogEvent = document.createEvent('Event'); // 自定义 DOM 事件
    showDialogEvent.initEvent('showDialog', true, true); // 初始化; initEvent()方法用于初始化通过 document.createEvent 接口创建的Event的

    if (!Array.isArray(subjects)) {
        if(subjects.length) subjects = Array.from(subjects);
        else subjects = [subjects];
    }

    subjects.forEach(function(subject) {
        subject.showDialog = function() {
            subject.dispatchEvent(showDialogEvent);
        }
    });
}
// 以上就是抽象行为的函数

// 把所有的btns赋给行为
setShowDialogBehvior(btns);

// 通过 click 事件触发 showDialog 行为(触发机制)
btns.forEach(btn => {
    btn.addEventListener('click', evt => {
        if(evt.target.showDialog) evt.target.showDialog();
    });
});

// 事件代理
document.getElementById('system').addEventListener('showDialog', function(evt) {
    console.log('showDialog');
    generateDialog(); // param, 传入参数, 用于确定是什么类型的弹窗 ?
});

function generateDialog(param) {
    var dialog = new CreateDialog();
}

// 弹窗类
function CreateDialog() {
    this.html = `
    <div class="dialog" minheight="320" minwidth="660">
    <div class="dlg_top">
        <!-- <img class="dlg_logo" src="images/ico_logo.png"/> -->
        <label class="dlg_title">弹出窗口</label>                
        <input class="dlg_btn_close dlg_btn_ico dlg_btn_close_top" type="button"/>                
        <input class="dlg_btn_ico dlg_btn_max_top" type="button"/>
    </div>
    <div class="dlg_content">
        <label style="display:inline-block; margin:10px;line-height:26px;">
        </label>
    </div>
    <div class="dlg_bottom">
        <input class="btn" type="button" value="提交" />
        <input class="dlg_btn_close btn" type="button" value="关闭" />
    </div>
    <!-- 缩放窗口用 -->
    <div class="dlg_right_div"></div>
    <div class="dlg_right_bottom_div"></div>
    <div class="dlg_bottom_div"></div>
    </div> `;

    this.init();
};

CreateDialog.prototype.init = function (params) {
    document.getElementById('system').insertAdjacentHTML('beforeend', this.html);
    
    this.bindEvents();
}

CreateDialog.prototype.bindEvents = function() {
    var $system = $('#system');
    // 事件代理, 因为dom一开始没有
    $system.on("click", ".dlg_btn_close", hideDialog);    
    // $("#dlg_submit").on("click", submitHandler);

    // 移动
    $system.on("mousedown", ".dialog", moveHandler);

    // 最大化 || 还原
    $system.on("click", ".dlg_btn_max_top", maxDialog);
    $system.on("click", ".dlg_btn_reback_top", rebackDialog);
}

// 最大化时保存弹窗的位置大小 // 每个弹窗自己单独一份
var preDialogWidth = 0; 
var preDialogHeight = 0;
var preDialogLeft = "0px";
var preDialogTop = "0px";

// 隐藏弹窗
function hideDialog() {
    var evt = arguments[0];
    $dialog = $(evt.target).parents('.dialog');
    $dialog.hide(); // 是hide还是删除, 有待考虑, hide 节约性能
}

// 移动
function moveHandler() {
    var evt = arguments[0];
    var $trgt = $(event.target);
    if (!$trgt.hasClass("dlg_top")) return;

    var $this = $(this);
    var el = $this[0];
    var oevent = evt || event;
    var distanceX = oevent.clientX - el.offsetLeft;
    var distanceY = oevent.clientY - el.offsetTop;
    $(document).bind("mousemove", function (evt) {
        var oevent = evt || event;
        el.style.left = oevent.clientX - distanceX + 'px';
        el.style.top = oevent.clientY - distanceY + 'px';
    });
    $(document).bind("mouseup", function () {
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
    });
}

// 最大化
function maxDialog() {
    console.log('maxDialog');
    var evt = arguments[0];
    var el_dialog = $(evt.target).parents('.dialog')[0];
    preDialogWidth = el_dialog.offsetWidth;
    preDialogHeight = el_dialog.offsetHeight;
    preDialogLeft = el_dialog.style.left;
    preDialogTop = el_dialog.style.top;
    console.log(`(${preDialogLeft})`);
    console.log(`(${preDialogWidth})`);
    el_dialog.style.left = 0 + "px";
    el_dialog.style.top = 0 + "px";
    el_dialog.style.width = window.innerWidth - 5 + "px";
    el_dialog.style.height = window.innerHeight - 5 + "px";

    console.log($(this));
    $(this).blur();
    $(this).removeClass("dlg_btn_max_top").addClass("dlg_btn_reback_top"); 
    // $(this).off("click").on("click", rebackDialog);  
}

// 还原
function rebackDialog() {
    console.log('click');
    var evt = arguments[0];
    var el_dialog = $(evt.target).parents('.dialog')[0];
    el_dialog.style.left = preDialogLeft;
    el_dialog.style.top = preDialogTop;
    el_dialog.style.width = preDialogWidth + "px";
    el_dialog.style.height = preDialogHeight + "px";

    $(this).blur();
    $(this).removeClass("dlg_btn_reback_top").addClass("dlg_btn_max_top");
    // $(this).off("click").on("click", maxDialog);
}
