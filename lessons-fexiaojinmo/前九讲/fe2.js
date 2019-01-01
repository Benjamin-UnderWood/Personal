//1.实现函数，左上角坐标是x,y ，边长为l的正方形
var square = function(x,y,l){
  jump(x,y)
  setHeading(0)
  var i = 0
  while(i<4){
    i++;
    forward(l)
    right(90)
  }
}
square(0,0,10)

//2.实现函数，左上角坐标（x,y) 长度w,h， 函数声明rect(x,y,w,h)
var rect=function(x,y,w,h){
  jump(x,y)
  setHeading(0)
  var i = 0
  while(i<2){
    i++;
    forward(w)
    right(90)
    forward(h)
    right(90)
  }
}

rect(0,0,20,10)

//3.画一排正方形，共5个，
//从（0,0）点开始，边长为30，正方形之间间隔为0，函数声明
//square5(x,y)，x,y为它的起始点
var square = function(x,y,l){
  jump(x,y)
  setHeading(0)
  var i = 0
  while(i<4){
    i++;
    forward(l)
    right(90)
  }
}
var square5=function(x,y){
  jump(x,y);
  setHeading(0);
  //循环画正方形
  var len = 30;
  var i=0;
  while(i<5){
    var x=len*i;
    var y=0;
    square(x,y,len)
    i++;
  }
}
square5(1,2)
// 5 实现函数，画一排正方形，有如下参数
//x,y是第一个正方形左上角的坐标
//n是正方形的个数
//space是两个正方形之间的间距
//l是正方形的边长
//square_line(x,y,n,space,l)
var square = function(x,y,l){
  jump(x,y)
  setHeading(0)
  var i = 0
  while(i<4){
    i++;
    forward(l)
    right(90)
  }
}
var square_line = function(x,y,n,space,l){
  jump(x,y)
  setHeading(0)
  var i = 0
  while(i<n){
    var margin=space;//用中间变量来承接，方便下次修改
    var len=l;//用中间变量来承接，方便下次修改，比如说下次l=10，如果没有这个中间变量就要修改好几处
    var x1=i*(len+margin)+x;
    var y1=y;
    square (x1,y1,len)
    i++;//注意i++的位置
  }
}
  square_line(-100,100,3，10,30)
  //6.画正方形方阵
  //x,y是第一个正方形左上角坐标
  //space是两个正方形之间的间距
  //l是正方形边长
  //n 是横向正方形个数
  //m 是纵向正方形个数
  //声明函数square_square(x,y,space,l,n,m)
var square = function(x,y,l){
    jump(x,y)
    setHeading(0)
    var i = 0
    while(i<4){
      i++;
      forward(l)
      right(90)
    }
  }
  var square_line = function(x,y,n,space,l){
    jump(x,y)
    setHeading(0)
    var i = 0
    while(i<n){
      var margin=space;//用中间变量来承接，方便下次修改
      var len=l;//用中间变量来承接，方便下次修改，比如说下次l=10，如果没有这个中间变量就要修改好几处
      var x1=i*(len+margin)+x;
      var y1=y;
      square (x1,y1,len)
      i++;//注意i++的位置；
    }
  }
  var square_square = function(x,y,space,l,n,m){
    jump(x,y)
    setHeading(0)
    var i = 0
    while(i<m){
      var margin =space;
      var len =l;
      var n1= n;
      var x1=x;
      var y1=i*(len+margin)+y;
      square_line(x1,y1,n1,margin,len);
      i++;//注意i++的位置，放在循环体的最后，而不是最前
    }
  }
  square_square(-100,10,30,20,5,4)

//7.实现函数，画一排矩形，有如下参数
//x,y是第一个矩形左上角的左上角坐标
//w,h是矩形的长度
//n是矩形的个数
//space是两个矩形之间的间距
//rect_line（x,y,w,h,n,space)
var rect=function(x,y,w,h){
  jump(x,y);
  setHeading(0)
  var i = 0
  while(i<2){
    i++;
    forward(w)
    right(90)
    forward(h)
    right(90)
  }
}
var rect_line =function(x,y,w,h,n,space){
  jump(x,y);
  setHeading(0);
  var i = 0;
  while(i<n){
    var wid = w;
    var x1=i*(space+wid)+i;
    var y1=y;
    rect(x1,y1,wid,h);
    i++;
}
}//注意括号对称，不要再中文输入法下打括号，会出bug，注意声明
rect_line(0,0,30,10,5,10)
//8.实现函数，画一个矩形方阵，参数如下
//x,y是第一个矩形左上角坐标
//space是两个矩形之间的间距(横向和纵向)
//w h是矩形的长度
//n 是横向矩形的个数
//m 是纵向矩形的个数
// 函数声明 rect_square(x,y,space,w,h,n,m)
var rect=function(x,y,w,h){
  jump(x,y);
  setHeading(0)
  var i = 0
  while(i<2){
    i++;
    forward(w)
    right(90)
    forward(h)
    right(90)
  }
}
var rect_line =function(x,y,w,h,n,space){
  jump(x,y);
  setHeading(0);
  var i = 0;
  while(i<n){
    var wid = w;
    var x1=i*(space+wid)+i;
    var y1=y;
    rect(x1,y1,wid,h);
    i++;
}
}//注意括号对称，不要再中文输入法下打括号，会出bug，注意声明
rect_line(0,0,30,10,5,10)
var rect_square =function(x,y,space,w,h,n,m){
  jump(x,y);
  setHeading(0);
  var i=0;
  while(i<m){
    var margin=space;
    var x1=x;
    var y1=y+i*(margin+h)
    rect_line(x1,y1,w,h,n,margin);
    i++;
  }
}
rect_square(0,0,10,30,10,5,3)
//9.实现函数，画一个正多边形，参数如下
//x y是起点，设起点为多边形的顶部边的左顶点
//n是多边形的边数
//l是边长
//polygon（x,y,n,l)
var polygon=function(x,y,n,l){
  jump(x,y);
  setHeading(0);
  var angle=360/n;
  var i=0;
  while(i<n){
    forward(l)
    right(angle)
    i++;
  }
}
polygon(0,0,5,30)
//10.实现函数，画圆，参数如下
//x,y,r分别是圆心坐标 和半径
//声明函数circle(x,y,r)
var polygon=function(x,y,n,l){
  jump(x,y);
  setHeading(0);
  var angle=360/n;
  var i=0;
  while(i<n){
    forward(l)
    right(angle)
    i++;
  }
}
var circle =function(x,y,r){
  jump(x,y);
  setHeading(0);
  var c =2*3.14*r
  var angle =10;
  var l=c/36;
  right(360-(90+angle/2));
  forward(r);
  setHeading(0);
  var i=0;
  while(i<36){
    forward(l)
    right(10)
    i++;
  }
}
circle(0,0,30)
