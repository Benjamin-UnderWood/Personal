// getter/setter 与数据双向绑定
const view = {
  nameEl: document.getElementById('name'),
  ageEl: document.getElementById('age'),
  submitBtn: document.getElementById('submitBtn'),
};

view.submitBtn.addEventListener('click', function(evt) {
  console.log('你要提交的数据是:' + [user.name, user.age]);
  evt.preventDefault();
});

function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.bind = function (view) {
  view.nameEl.addEventListener('change', evt => {
    this.name = evt.target.value;
  });
  view.ageEl.addEventListener('change', evt => {
    this.age = evt.target.value;
  });
};

Object.defineProperty(User.prototype, 'name', { // name 为全局变量
  set: function(name) { // 写入
    view.nameEl.value = name;
  },
  get: function() { // 读取
    return view.nameEl.value;
  }
});

Object.defineProperty(User.prototype, 'age', { // age 为全局变量
  set: function(age) {
    var ageOptions = Array.from(view.ageEl.options)
              .map(item => item.innerHTML);
    if(ageOptions.indexOf(age) === '-1') {throw new Error('无效的年龄格式');}
    view.ageEl.value = age;
  },
  get: function() {
    return view.ageEl.value;
  }
});

var user = new User('akira', '80后');
user.bind(view);
