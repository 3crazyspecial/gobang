var chessboard = document.getElementsByClassName('chessboard')[0];
var point = document.getElementsByClassName('point')[0];
var button = document.getElementsByClassName('restart')[0];
var color = 'black';
var dataArr = [];
var win = false;

createBoard();
chessboard.onclick = setChess;
button.onclick = restart;


//棋盘格子的绘制
function createBoard () {
    for(var i = 0; i < 15; i++) {
        dataArr[i] = [];
        for(var j = 0; j < 15; j++){
            var _div = document.createElement('div');
            _div.className = 'chess'; 
            
            //id 用于方便后面棋子落位数据获取以及输赢判断的需要
            _div.id = 'location-' + i + '-' + j;
            chessboard.appendChild(_div);

            if(i == 0){
                _div.className += ' top';
            }
            if(i == 14){
                _div.className += ' bottom';
            }
            if(j == 0){
                _div.className += ' left';
            }
            if(j == 14){
                _div.className += ' right';
            }
            
        }
    }
}

//落棋，绘制棋子
function setChess () {
    var event = event || window.event;
    var target = event.target;
    var data = target.id.split('-');
    var i = +data[1],
        j = +data[2];
    
    if(target.className !== 'chessboard') {
        if(target.className.indexOf('active') == -1) {
            target.className += ' active ' + color;
            dataArr[i][j] = color;
            winJudge(i, j, color);

            //改变下一步棋子的颜色
            color = color == 'black' ? 'white' : 'black';
            
            //通过颜色来触发提示什么颜色下的函数，依靠key值判断是否提示
            if(!win) {
                getStatus(color);
            }
        }
    }
    
}

//获取下棋方
function getStatus(color) {
    if(color == 'black'){
        point.innerHTML = '<p class="point">当前执子: 黑棋</p>';
    }else{
        point.innerHTML = '<p class="point">当前执子: 白棋</p>';
    }
}

//棋子落位时判断是否获胜
function winJudge (i, j, color) {
    var count = 1;
    //不能直接使用i，j来for循环来防止死循环
    var row,
        column;

    //垂直方向的判断
    //下方
    for(row = i + 1;row < 15 && row < i + 5; row++) {
        if(dataArr[row] && dataArr[row][j] == color) {
            count++;
            isWin(count, color);
        }else{
            break;
        }
    }
    for(row = i - 1; row >= 0 && row > i - 5; row--) {
        if(dataArr[row] && dataArr[row][j] == color) {
            count++;
            isWin(count, color);
        }else{
            break;
        }
    }

    //水平
    //重置count
    count = 1;
    for(column = j + 1; j < 15 && j < j + 5; column++) {
        if(dataArr[i] && dataArr[i][column] == color) {
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }
    for(column = j - 1; j >= 0 && j > j - 5; column--) {
        if(dataArr[i] && dataArr[i][column] == color) {
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }

    //135deg
    count = 1;
    for(row = i + 1, column = j + 1; row < 15 && column < 15 && row < i + 5 && column < j + 5; row++, column++){
        if(dataArr[row] && dataArr[row][column] == color){
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }
    for(row = i - 1, column = j - 1; row >= 0 && column >= 0 && row > i - 5 && column > j - 5; row--, column--){
        if(dataArr[row] && dataArr[row][column] == color){
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }

    //45deg
    count = 1;
    for(row = i - 1, column = j + 1; row >= 0 && column < 15 && row > i - 5 && column < j + 5; row--, column++){
        if(dataArr[row] && dataArr[row][column] == color){
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }

    for(row = i + 1, column = j - 1; row < 15 && column >= 0 && row < i + 5 && column > j - 5; row++, column--){
        if(dataArr[row] && dataArr[row][column] == color){
            count++;
            isWin(count, color);
        } else {
            break;
        }
    }

    
}

function isWin(num, color) {
    if(num == 5){
        if(color == 'black') {
            point.innerHTML = '<p class="point">黑棋获胜</p>';
        } else {
            point.innerHTML = '<p class="point">白棋获胜</p>';
        }
        //通过添加一个key值来防止添加文本冲突
        win = true;
        chessboard.onclick = null;
    } else {
        win = false;
    }
}

function restart () {
    //清空数据
    for(var i = 0; i < 15; i++) {
        var restartArr = [];
        for(var j = 0; j < 15; j++){
            restartArr.push('');
        }
        dataArr[i] = restartArr;
    }

    //恢复游戏默认属性
    color = 'black';
    point.innerHTML = '<p class="point">黑棋先下</p>';

    //如果是获胜时点击的重新开始，落棋事件会被取消，需要重新开启事件
    chessboard.onclick = setChess;
    

    //清空棋子
    var divCollection = chessboard.getElementsByTagName('div');
    var len = divCollection.length;
    var divClassName;

    for(var i = 0; i < len; i++){
        divClassName = divCollection[i].className;
        
        //通过对类名的判断筛选来恢复类名达到视觉上清空棋子
        if(divClassName.indexOf('active black') != -1){
            divClassName = divClassName.replace('active black','');
            divCollection[i].className = divClassName;
        }

        if(divClassName.indexOf('active white') != -1){
            divClassName = divClassName.replace('active white','');
            divCollection[i].className = divClassName;
        }
    }
}


