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
    // TODO: 实际上dom为各种类型的弹窗(agent中基类生成的子类)
    // TODO: 实际上应该是请求得到的数据
    var html =
     `
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
    </div> 
    `;
    document.getElementById('dialogs').insertAdjacentHTML('beforeend', html);
    // 每次操作的总是最后一个弹窗(显示在页面最前面的)
    // TODO: 点击某个弹窗顶部, 会使得该弹窗置于最前(位置跑到最后)
    let dom = $('#dialogs').lastElementChild;
    console.log(dom);
    let dialog = new Dialog(dom); // dom 用于确定是什么类型的弹窗 
});

// 弹窗类
function Dialog(dom) {
    this.dom = dom; // 弹窗dom对象

    // TODO: 记录最大化窗口时每个弹窗实例的位置(供还原时计算窗口位置用)
    this.preDialogWidth = 0; 
    this.preDialogHeight = 0;
    this.preDialogLeft = "0px";
    this.preDialogTop = "0px";

    // TODO: 记录拖拽窗口时每个弹窗实例的位置 
    this.mouseStart = {};
    this.rightStart = {};

    // 事件委托; dialog实例上的各个功能委托在 dialog dom 元素上
    // 隐藏弹窗
    $(this.dom).on("click", ".dlg_btn_close", function() {
        console.log('隐藏弹窗了');
    }); 
};

Dialog.prototype.bindEvents = function() {
    var $system = $('#system');
    // 事件代理, 因为dom一开始没有
    $system.on("click", ".dlg_btn_close", hideDialog.bind(this));    
    // $("#dlg_submit").on("click", submitHandler);

    // 移动
    $system.on("mousedown", ".dialog", moveHandler.bind(this));

    // 最大化 || 还原
    $system.on("click", ".dlg_btn_max_top", maxDialog);
    $system.on("click", ".dlg_btn_reback_top", rebackDialog);

    // 拖拽: 支持右拉/下拉/右下拉
    $system.on("mousedown", ".dlg_right_div", pullright.bind(this));
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

// 右拉
function pullright() {
    // console.log(this); 默认this为事件对象
    console.log(this); // bind过的this, 即为实例
    var evt = arguments[0];
    this.mouseStart.x = evt.clientX;
    this.mouseStart.y = evt.clientY;
    this.rightStart.x = evt.currentTarget.offsetLeft;
    
    document.addEventListener("mousemove", doDragToRightBottomToRight.bind(this), true);
    document.addEventListener("mouseup", stopDragToRightBottomToRight, true);

}

function doDragToRightBottomToRight(ev) {
    var oEvent = ev || event;
    var l = oEvent.clientX - this.mouseStart.x + this.rightStart.x;
    var w = l + el_dlg_right_bottom.offsetWidth;
    if (w < el_dlg_right_bottom.offsetWidth) {
        w = el_dlg_right_bottom.offsetWidth;
    }
    else if (w > document.documentElement.clientWidth - el_dialog.offsetLeft) {
        w = document.documentElement.clientWidth - el_dialog.offsetLeft - 2;
    }
    if (w < minWidth) return;
    el_dialog.style.width = w + "px";
};

function stopDragToRightBottomToRight(evt) {
    if (evt.currentTarget.releaseCapture) {
        evt.currentTarget.onmousemove = null;
        evt.currentTarget.onmouseup = null;
        evt.currentTarget.releaseCapture();
    }
    else {
        document.removeEventListener("mousemove", doDragToRightBottomToRight, true);
        document.removeEventListener("mouseup", stopDragToRightBottomToRight, true);
    }
};
