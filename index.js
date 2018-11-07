/**
 * Created by Yuki on 2018/11/4.
 */
var game;
var timer =null;
var row;
var timeCount = 0;
var time =0;
var generateIndex =function (){
    return  Math.ceil(Math.random() * 7);//产生一个随机数；(0.23,-0.67)(1,7)
};
var generateDir =function (){
    return  Math.ceil(Math.random() * 4) - 1 ;//产生一个随机数；(0.23,-0.67)(1,7)
};
var dom ={
    gameDiv : document.getElementById("game"),
    nextDiv : document.getElementsByClassName("nextDiv")[0],
    level : document.getElementsByClassName("level")[0],
    line : document.getElementsByClassName("line")[0],
    score : document.getElementsByClassName("score")[0],
    time : document.getElementsByClassName("time")[0]

};
function keyBoard() {
    document.onkeydown = function (e) {
        if (e.keyCode == 37 || e.keyCode ==65 ) {//按A想左
            game.left();
        } else if (e.keyCode == 33 || e.keyCode ==87) {//向上辩换
            game.rotate();
        } else if (e.keyCode == 39 || e.keyCode ==68) { //向右
            game.right()
        } else if (e.keyCode == 40 || e.keyCode == 83) { //向下
            game.down();
        }else if (e.keyCode==32){
            game.fall();
        }
    }
}
function timeFun(){
  timeCount +=1;
    if (timeCount == 2 ){
        timeCount =0;
        time +=1;
        game.addTime(time);
    }
}
function stop (){
    if(timer){
        clearInterval();
        timer =null;
    }
    document.onkeydown =null;
}
function move(){
    timeFun();
    game.down();
     if (!game.down()){
     game.fixed();
     row = game.checkClear();
     if(row){
        game.addLine(row);
         game.addScore(row);
     }
     if (!game.over()) {
         game.nextGenerate(generateIndex(), generateDir());
     }
     else{
         stop();
     }
     }
}
function start (){
    game =new game();
    game.init(dom,generateIndex(), generateDir());
    keyBoard();
   game.nextGenerate(generateIndex(), generateDir());
   var timer =setInterval(move,500);
}
window.onload = function(){
    start();
};