let conf = {
  adapter: 'sqlite',
  db: {
    sqlite: {
      name: 'xxx.sqlite',
    },
    mysql: {
      name: 'xxx',
      username: 'work',
      password: '******'
    }
  }
};

// 直接引用
let conf2 = conf;
conf2.adapter = 'mysql';

console.log(conf.adapter); // 'mysql'

// ES5 浅拷贝
conf.adapter = 'sqlite';
let copied = Object.assign({}, conf);
copied.adapter = 'mysql';

console.log(conf.adapter); // 'sqlite'
console.log(copied.adapter); // 'mysql'

copied.db.sqlite.name = 'yyy.sqlite';

console.log(conf.db.sqlite.name); // 'yyy.sqlite'