/**
 * Created by Yuki on 2018/10/30.
 */
/**
 * Created by Yuki on 2018/10/30.
 */
  var game  =function() {
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0,0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0,0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var cur;
    var next;
    var gameDivs = [];
    var nextDivs = [];
    var line = 0;
    var score =0;

    function initDiv(data, container, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = "none";
                //定义小方格的class名，状态
                newNode.style.top = (i * 20) + "px";
                newNode.style.left = (j * 20) + "px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    function refreshDiv(data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = "none";
                }
                else if (data[i][j] == 1) {
                    divs[i][j].className = "done";
                }
                else if (data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    }
    function clearData() {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j))
                {
                    gameData [cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    function setData() {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++)
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];//gamedata[10][5]
                }
        }
    }
    //检测 是否到达边缘可以下落
    function check(pos, x, y) {
        if (pos.x + x< 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false
        } else if (pos.y + y  >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false
        }
        return true;
    }
    // 检测数据 准备下移的地方是否有方块存在，且不处于边缘地区，可以下移;pos（预计的位置），data当前数据
   var isValid = function (pos,data) { //传入 test & cur.data ，整体和cur 的位置不一样
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0 && !check(pos, i,j)) {
                        return false;
                }
            }
        }
        return true;

    };
    // 方块的四种运动方法；
    function down() {
       if (cur.canDown(isValid)) {
           clearData();
           cur.down();
           setData();
           refreshDiv(gameData, gameDivs);
           return true;
       }
        return false;
    }
    function left() {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData(cur);
            refreshDiv(gameData, gameDivs)
        }
    }
    function right() {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData(cur);
            refreshDiv(gameData, gameDivs)
        }
    }
    function rotate (){
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData(cur);
            refreshDiv(gameData, gameDivs)
        }
    }
    function fall(){
        while(down());
    }

      //随机产生下一个方块
    function nextGenerate(generateIndex,generateDir) {
        cur=next;
        setData();
        next = SquareFactory.prototype.make(generateIndex,generateDir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
      //检测是否满一行，消行
      function checkClear (){
          var row = 0;
          for (var i =gameData.length-1; i>=0; i--){ //20hang
              var clear =true;
              for (var j = 0;j<gameData[0].length;j++){
                  if (gameData[i][j] != 1){
                      clear =false;
                      break;
                  }
              }
              if(clear){
                  row+= 1;
                  for(var m =i;m>0;m--){
                      for (var n = 0;n<gameData[0].length;n++){
                          gameData[m][n]=gameData[m-1][n];
                      }
                  }
                  for( n = 0;n<gameData[0].length;n++){
                      gameData[0][n]=0;
                  }
                  i++;
              }
          }
          console.log(row);
          return row;
      }
      function addLine(row){
          line =line+row;
          dom.line.innerText = "Lines :"+ line;
      }
      function addScore (row){
          var s;
          if (row>=1<5){
              s =row *5;
          }
          else if(row>5){
              s =row*10;
          }
          score = s+score;
          dom.score.innerText ="Scores: " + score;
      }
    function addTime (time){
        dom.time.innerText ="Times "+ time +" s";

    }
      //检测游戏是否结束
      function over () {
          for(var i =0 ;i<gameData.length;i++){
              var gameOver =false;
              if(gameData[1][i]==1){
                  return true;
              }
          }
          return gameOver;
       }
      //方块固定
    function fixed(){
            for (var i = 0; i < cur.data.length; i++) {
                for (var j = 0; j < cur.data[0].length; j++) {
                    if (check(cur.origin, i, j)) {
                        if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                        }
                    }
                }
            }
            refreshDiv(gameData, gameDivs);
    }

      function init(dom,type,dir) {
          var gameDiv = dom.gameDiv;
          var nextDiv = dom.nextDiv;
          //next = SquareFactory.prototype.make(generateIndex(),generateDir());
          //cur  = SquareFactory.prototype.make(generateIndex(),generateDir());
          next = SquareFactory.prototype.make(type,dir);
          initDiv(gameData, gameDiv, gameDivs);
          initDiv(next.data, nextDiv, nextDivs);
          refreshDiv(next.data, nextDivs);
      }
      this.init = init;
      this.down = down;
      this.left = left;
      this.right = right;
      this.rotate = rotate;
      this.fall = fall;
      this.fixed =fixed;
      this.checkClear =checkClear;
      this.over =over;
      this.nextGenerate =nextGenerate;
      this.addLine =addLine;
      this.addScore =addScore;
    this.addTime =addTime;
  };



