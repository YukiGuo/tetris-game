
//方块方法
//原型
var game;
var  Square = function() {
    this.data = [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
    ];
    this.origin = {
        x: 0,
        y: 0
    };
    this.dir = 0;
    this.rotates = [
        [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    ];
};
Square.prototype.down =function (){
    this.origin.x = this.origin.x + 1;
};
Square.prototype.left =function (){
    this.origin.y = this.origin.y - 1;
};
Square.prototype.right =function (){
    this.origin.y = this.origin.y + 1;
};
Square.prototype.rotate =function (num){
    if(!num) num =1;
    this.dir = (this.dir +num) % 4;
    for (var i = 0;i<this.data.length;i++) {
        for (var j = 0; j < this.data.length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j]
        }
    }
};
Square.prototype.canDown = function (isValid){
    var test ={};
    test.x = this.origin.x + 1;
    test.y = this.origin.y ;
    return isValid(test,this.data);
};
Square.prototype.canLeft = function (isValid){
    var test = {};
    test.x = this.origin.x ;
    test.y = this.origin.y -1 ;
    return isValid(test,this.data);
};
Square.prototype.canRight = function (isValid){
    var test = {};
    test.x = this.origin.x ;
    test.y = this.origin.y + 1 ;
    return isValid(test,this.data);
};
Square.prototype.canRotate = function (isValid){
    var d = ( this.dir + 1) % 4;
    var test =[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for (var i = 0;i<this.data.length;i++){
        for (var j = 0;j<this.data.length; j++){
            test[i][j] =this.rotates[d][i][j]
        }
    }
    return isValid(this.origin, test);
};
//定义7种方块
var Square1 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [0,2,0,0],
            [0,2,0,0],
            [2,2,0,0],
            [0,0,0,0]
        ],
        [
            [2,0,0,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,2,0],
            [0,0,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ];
};
Square1.prototype =Square.prototype;
var Square2 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]];
};
Square2.prototype = Square.prototype;
var Square3 = function(){
    Square.call(this);//继承属性

    this.rotates =[
        [
            [2,0,0,0],
            [2,0,0,0],
            [2,2,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,2,0],
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,2,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ]];
};
Square3.prototype =Square.prototype;
var Square4 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [0,2,2,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0]
        ],
        [
            [0,2,2,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0]
        ],];
};
Square4.prototype =Square.prototype;
var Square5 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0]
        ],
        [
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0]
        ],
        [
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ];
};
Square5.prototype =Square.prototype;
var Square6 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [2,2,0,0],
            [0,2,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,0,0],
            [0,2,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0]
        ]
    ];
};
Square6.prototype =Square.prototype;
var Square7 = function(){
    Square.call(this);//继承属性
    this.rotates =[
        [
            [0,2,0,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0]
        ],
        [
            [2,2,2,0],
            [0,2,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0]
        ],
    ];
};
Square7.prototype =Square.prototype;
var SquareFactory =function(){
};
SquareFactory.prototype.make = function (index,dir) {
    var s ;
    switch (index) {
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s =new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default :
            break;
    }
    s.origin.x = 0;
    s.origin.y = 4;
    s.rotate(dir);
    return s ;
};