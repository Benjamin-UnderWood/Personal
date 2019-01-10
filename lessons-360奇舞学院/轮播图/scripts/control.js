class Slider {
    constructor(id, cycle=3000) {
        this.container = document.getElementById(id);
        this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
        this.cycle = cycle; //控制流
        this.slideHandlers = [];
        // UI控制流部分
        let controller = this.container.querySelector('.slide-list__control');
        if (controller) {
            let buttons = document.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
            controller.addEventListener('mouseover', evt => {
                console.log('mouseover');
                var idx = Array.from(buttons).indexOf(evt.target);
                if (idx >= 0) {
                    this.slideTo(idx);
                    this.stop();
                }
            });

            controller.addEventListener('mouseout', () => { // 箭头函数不可以使用 arguments, 该对象在函数体内不存在, 如果要用使用rest参数代替
                this.start();
            });

            // 我需要知道它当前已经切换到哪一页了；当前控制点在哪个上(红点)；
            // 区别于 addEventListener 发生在组件(class Slider)内部；
            // 但是我们有时候需要在组件外部添加一些额外的控制点；在 class Slider外部定义在实例上的.104行；
            this.addSlideListener(function(idx) {
                let selected = controller.querySelector('.slide-list__control-buttons--selected');
                if(selected) selected.className = 'slide-list__control-buttons';
                buttons[idx].className = 'slide-list__control-buttons--selected';
            });
        }
    }

    // API部分
    // 获得当前展示的图片
    getSelectedItem() {
	    return this.container.querySelector('.slider-list__item--selected');
    }
    // 当前选中图片的编号
    getSelectedItemIndex() {
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }
    // 跳到目标图片
    // [...原API改动部分]
    slideTo(idx) {
        let selected = this.getSelectedItem();
        if (selected) {
            selected.className = 'slider-list__item'; // 其实可以先判断，selected是否与idx相等；再决定是否slider
        }
        let item = this.items[idx];
        if (item) {
            item.className = 'slider-list__item--selected'
        }

        // 通过 addSlideListener(handler)；如果有 handler(这里是只添加了一个函数，27行),那就去 callback 一下
        this.slideHandlers.forEach(handler => {
            handler(idx);// 回调；回到上面组件中去调用
        }); // 在之前设计的 API 上增加了这条;控制红点的跳动；调用位置在 class Slider的 addSlideListener(function...
    }
    // [...]
    // 下一张图片
    slideNext() {
        let currentIdx = this.getSelectedItemIndex();
        let nextIdx = (currentIdx + 1) % this.items.length;
        this.slideTo(nextIdx);
    }
    // 前一张图片
    slidePrevious() {
        let currentIdx = this.getSelectedItemIndex();
        let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
        this.slideTo(previousIdx);
    }

    // 新增 API
    start() {
        this.stop();
        this._slideTimer = setInterval(() => { // this._sliderTimer 全局变量
            this.slideNext();
        }, this.cycle); // cycle
    }
    stop() {
        clearInterval(this._slideTimer);
    }
    addSlideListener(handler) {
        this.slideHandlers.push(handler);
    }
}

// 调用
const slider = new Slider('my-slider');
slider.start();

// 外部测试 addSlideListener
const slideNext = document.getElementById('slideNext');
slideNext.onclick = function(){
    slider.slideNext();
};

const slidePrevious = document.getElementById('slidePrevious');
slidePrevious.onclick = function(){
    slider.slidePrevious();
};

const slideState = document.getElementById('slideState');
slider.addSlideListener(function(idx){
    // console.log(slideStat)
	slideState.textContent = `当前第 ${idx} 页`
}); // 在这里推入，但会被组件里面的函数调用！！！
