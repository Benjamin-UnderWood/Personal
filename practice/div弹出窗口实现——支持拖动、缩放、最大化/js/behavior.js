// 生成对象 createObject 行为模式
class SetBehavior {
    constructor(subjects){
        this.subjects = subjects;
        this.init();
    }

    init() {
        var subjects = this.subjects;
        this.setBehavior(subjects);
        subjects.forEach(subject => {
            subject.addEventListener('click', evt => {
                console.log(evt.target);
                if (evt.target.createObject) {
                    // evt.target.createObject(); >> 用点击行为触发创建对象的行为
                    var data;
                    var child = new Child(data);
                }
            });
        });
    }

    setBehavior(subjects) {
        var createEvent = document.createEvent('Event'); // 自定义 DOM 事件
        createEvent.initEvent('createObject', true, true); // 初始化; initEvent()方法用于初始化通过 document.createEvent 接口创建的Event的

        if (!Array.isArray(subjects)) {
            if (subjects.length) subjects = Array.from(subjects);
            else subjects = [subjects];
        }

        subjects.forEach(function (subject) {
            subject.createObject = function () {
                subject.dispatchEvent(createEvent);
            }
        });
    }
}
// 弹窗之上的层级, 基类, 弹窗只是子类的一个属性
class Child {
    constructor(data) {
        this.data = data;
        this.init();
    }

    init() {
        // 初始化实例数据
        // TODO: 记录最大化窗口时每个弹窗实例的位置(供还原时计算窗口位置用)
        this.preDialogWidth = 0; 
        this.preDialogHeight = 0;
        this.preDialogLeft = "0px";
        this.preDialogTop = "0px";
        // TODO: 记录拖拽窗口时每个弹窗实例的位置 
        this.mouseStart = {};
        this.rightStart = {};

        // 调用方法
        this.createDialog();
        this.click();
    }

    createDialog() {
        var that = this;
        // TODO: 实际上dom为各种类型的弹窗(agent中基类生成的子类)
        // TODO: 实际上应该是请求得到的数据渲染而成的dom; dom 与 数据在同一层级
        var dialog = document.createElement("div");
        var dlg_top = document.createElement("div");
        var dlg_content = document.createElement("div");
        var dlg_btn_close = document.createElement("input");
        // 能点击生成新对象的元素
        var dlg_newChildBtn = document.createElement("button");
        var dlg_newChildDiv = document.createElement("div");

        dialog.appendChild(dlg_top);
        dialog.appendChild(dlg_content);
        dialog.appendChild(dlg_newChildBtn);
        dialog.appendChild(dlg_newChildDiv);
        dialog.setAttribute('class', 'dialog');
        dlg_top.setAttribute('class', 'dlg_top');
        dlg_content.setAttribute('class', 'dlg_content');
        dlg_top.appendChild(dlg_btn_close);
        dlg_btn_close.setAttribute('class', 'dlg_btn_close dlg_btn_ico dlg_btn_close_top');
        dlg_newChildBtn.setAttribute('class', 'btn createObject');
        dlg_newChildDiv.setAttribute('class', 'btn divBtn createObject'); // 方便控制样式, 直接随便btn类
       
        document.body.appendChild(dialog);

        dlg_btn_close.addEventListener('click', hideDialog);
        function hideDialog() {
            dialog.style.display = 'none';
        }

        dialog.addEventListener('mousedown', moveHandler);
        function moveHandler() {
            var evt = arguments[0];
            var $trgt = $(event.target);
            if (!$trgt.hasClass("dlg_top")) return; // 用于判断是否处在能移动窗口的位置上

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

        // TODO: 点击弹窗顶部, 该弹窗置于最后(删除, 插入), 从而在页面显示在最前
        dialog.addEventListener('click', function(evt) {
            dialog.remove();
            document.body.appendChild(dialog);
        });

        // 对外输出(给该函数外的其他地方用)
        this.dialog = dialog;
        this.dlg_top = dlg_top;
        // 每次操作的总是最后一个弹窗(显示在页面最前面的)
    }

    // 点击类中的元素, 会生成新的类
    click() {
        // 传统写法
        var that = this;
        // 点击能生成子类的元素, 生成子类 ex button
        // $(this.dialog).find('button').on('click', function(){
        //     var data; // 传入所需要的数据, 一般是在基类上的信息
        //     var child = new Child(data);
        // });
        // ex 特定的div
        // $(this.dialog).find('.divBtn').on('click', function(){
        //     var data; // 传入所需要的数据, 一般是在基类上的信息
        //     var child = new Child(data);
        // });
        // ex 其他能点击生成子类的元素, 可能还有很多很多
        // 缺点 需要一个元素一个元素的绑定事件(本质上这些事件是同一个行为, 即生成对象)

        // TODO: 这时就需要用到行为模式了, 对所有具有生成子类能力的元素, 赋予生成子类的行为
        // 将对象中所有具备 createObject 类的元素赋予 createObject 行为
        new SetBehavior(this.dialog.querySelectorAll('.createObject')); // 可以直接写到 createDialog 里面
    }
}

// 界面初始化, 已经存在子类(按照需要显示多少子类, 这里假设生成一个子类)
var data;
var child = new Child(data);

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