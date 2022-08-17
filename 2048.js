var board;
let lastText = "";
var allscores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var numberOfPlays = -2;                  //no of times game is played
var score = 0;
var preScore;
var rows = 4;
var columns = 4;
let flag = false;
var state = [                               //to record every move
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
];
var noOfMoves;
var firstState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

window.onload = function () {
    setGame();
}

function setGame() {
    lastText = "";
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];
    let b = document.getElementById("board");
    b.classList.value = "";
    b.classList.add("column");
    numberOfPlays++;
    if (numberOfPlays > 9) {
        numberOfPlays = 9;
        if (allscores[numberOfPlays] < score)
            allscores[numberOfPlays] = score;
    } else
        allscores[numberOfPlays] = score;
    let copyCat;
    for (let i = numberOfPlays; i >= 1; i--) {
        if (allscores[i] > allscores[i - 1]) {
            copyCat = allscores[i];
            allscores[i] = allscores[i - 1];
            allscores[i - 1] = copyCat;
        } else
            break;
    }
    score = 0;
    preScore = [0];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var element = document.getElementById((r.toString() + "-" + c.toString()));
            if (element)
                element.remove();
        }
    }


    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    document.getElementById("highscore").innerText = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();
    for (i = 0; i < 10; i++) {
        if (allscores[i])
            document.getElementById("highscore").innerText += "\n" + (i + 1) + ". " + allscores[i];
    }
    document.getElementById("score").innerText = score + "\n" + lastText;

    noOfMoves = 0;
    for (let r = 0 ; r < rows ; r++){
        for (let c = 0 ; c < columns ; c++){
            state[0][r][c] = board[r][c];
        }
    }

    for (let r = 0 ; r < rows ; r++){
        for (let c = 0 ; c < columns ; c++){
            firstState[r][c] = state[0][r][c];
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }

}

document.addEventListener('keyup', (e) => {
    
        let didslide;
        if (e.code == "ArrowLeft") {
            didslide = slideLeft();
            if (didslide){
                setTwo();
                noOfMoves++;
                state[noOfMoves] = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                for (let r = 0 ; r < rows ; r++){
                    for (let c = 0 ; c < columns ; c++){
                        state[noOfMoves][r][c] = board[r][c];
                    }
                }
                preScore[noOfMoves] = score;
            }
        } else if (e.code == "ArrowRight") {
            didslide = slideRight();
            if (didslide){
                setTwo();
                noOfMoves++;
                state[noOfMoves] = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                for (let r = 0 ; r < rows ; r++){
                    for (let c = 0 ; c < columns ; c++){
                        state[noOfMoves][r][c] = board[r][c];
                    }
                }
                preScore[noOfMoves] = score;
            }
        } else if (e.code == "ArrowUp") {
            didslide = slideUp();
            if (didslide){
                setTwo();
                noOfMoves++;
                state[noOfMoves] = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                for (let r = 0 ; r < rows ; r++){
                    for (let c = 0 ; c < columns ; c++){
                        state[noOfMoves][r][c] = board[r][c];
                    }
                }
                preScore[noOfMoves] = score;
            }
        } else if (e.code == "ArrowDown") {
            didslide = slideDown();
            if (didslide){
                setTwo();
                noOfMoves++;
                state[noOfMoves] = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                for (let r = 0 ; r < rows ; r++){
                    for (let c = 0 ; c < columns ; c++){
                        state[noOfMoves][r][c] = board[r][c];
                    }
                }
                preScore[noOfMoves] = score;
            }
        }
        let i;
        let j;
        flag = true;
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                if (board[i][j] == 0) {
                    flag = false;
                    break;
                }
            }
        }
        if (flag == true) {
            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns - 1; j++) {
                    if ((board[i][j] == board[i][j + 1])) {
                        flag = false;
                        break;
                    }
                }
            }
            for (i = 0; i < rows - 1; i++) {
                for (j = 0; j < columns; j++) {
                    if ((board[i][j] == board[i + 1][j])) {
                        flag = false;
                        break;
                    }
                }
            }

        }
        if (flag == true) {                                        //Game Over
            let b = document.getElementById("board"); 
            b.classList.add("blurBoard");
            lastText = "Game Over";
        }
        document.getElementById("score").innerText = score + "\n" + lastText;
    }
)

function filterZero(row) {
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    let didslide = 0;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != row[c]) {
                didslide = 1;
                break;
            }
        }

        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return didslide;
}

function slideRight() {
    let didslide = 0;
    for (let r = 0; r < rows; r++) {
        let row = board[r]; //[0, 2, 2, 2]
        row.reverse(); //[2, 2, 2, 0]
        row = slide(row) //[4, 2, 0, 0]
        row.reverse(); //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++) {
            if (row[c] != board[r][3 - c]) {
                didslide = 1;

                
                break;
            }
        }
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return didslide;
}

function slideUp() {
    let didslide = 0;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            if (board[r][c] != row[r]) {
                didslide = 1;
                
                break;
            }
        }
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return didslide;
}

function slideDown() {
    let didslide = 0;
    for (let c = 0; c < rows; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < columns; r++) {
            if (board[r][c] != row[r]) {
                didslide = 1;

                
                break;
            }
        }
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    return didslide;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            tile.classList.add("animatedTile");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

function undoMove() {                                //undo
    for (let r = 0 ; r < rows ; r++){                       
        for (let c = 0 ; c < columns ; c++){
            state[0][r][c] = firstState[r][c];
        }
    }
    if (noOfMoves != 0){
        board = state[noOfMoves-1];
        score = preScore[noOfMoves-1];
        state.pop();
        preScore.pop();
        noOfMoves--;
        for (let r = 0 ; r < rows ; r++){
            for (let c = 0; c < columns ; c++){
                let num = board[r][c];
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                updateTile(tile, num);
            }
        }
        if (flag == true){
            let b = document.getElementById("board"); 
            b.classList.value = "";
            b.classList.add("column");
            lastText = "";
        }
        document.getElementById("score").innerText = score + "\n" + lastText;
    }
}