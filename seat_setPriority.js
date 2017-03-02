//设定座位的优先级
seat.setPriority = function (row, col) {
    // 如果未给出row和col，从取最中间的座位
    row = row ? row : Math.floor((seat.row + 1) / 2);
    col = col ? col : Math.floor((seat.col + 1) / 2);
    row = parseInt(row);
    col = parseInt(col);
    // 参数
    var v = 0; // 优先级
    var i = 0; // 螺旋参数
    var bLB = true;
    var bLT = true;
    var bRB = true;
    var bRT = true; // 四个角落
    // 选择的最佳座位
    var setSeatPriority = function (row, col, value) {
        if (row < 1 || col < 1 || row > seat.row || col > seat.col) {
            return value;

        }
        var td = seat.seatArray[row - 1][col - 1];
        if (td != null&&td.seatstatus!="2"&&td.seatType!="road") {
            value += 1;
            td.priority = value;
        }
        // 角落处理
        if (row == 1 && col == 1) {
            bLT = false;
        }
        if (row == 1 && col == seat.col) {
            bRT = false;
        }
        if (row == seat.row && col == 1) {
            bLB = false;
        }
        if (row == seat.row && col == seat.col) {
            bRB = false;
        }
        return value;
    }
    v = setSeatPriority(row, col, v);
    // 螺旋设定其他座位
    while (bLB || bLT || bRB || bRT) {
        i++;
        //i == 1
        for (var j = 0; j < i; j++) {
            v = setSeatPriority(++row, col, v);
          //v = 2
        } // 向下
        for (var j = 0; j < i; j++) {
            v = setSeatPriority(row, --col, v);
        } // 向左
        i++;
        for (var j = 0; j < i; j++) {
            v = setSeatPriority(--row, col, v);
        } // 向上
        for (var j = 0; j < i; j++) {
            v = setSeatPriority(row, ++col, v);
        } // 向右
    }
}
