var wordToGuess = getWordToGuess();
var won = false;

var currentRow = 0;
var currentCell = 0;

var boardDiv = document.getElementById('board');
var rows = boardDiv.getElementsByTagName('div');

var board = [];
for (var i = 0; i < 6; i++) {
    board.push(["", "", "","", ""]);
}

let green = [];
let gray = [];

var wordsCheck = JSON.parse(dataCheck)[0];

var keyboardDiv = document.getElementById('keyboard');
var keyboardRows = keyboardDiv.getElementsByTagName('div');


function getWordToGuess(){
    var words = JSON.parse(dataRandom);
    let word = words[0][Math.floor(Math.random() * Object.keys(words[0]).length)];
    console.log(word);
    return word;
}

function keyClicked(key){
    let char = String(key.getAttribute("data-key"));

    if(won) return null;
    if(currentRow >= 6) return null;

    if(char.length > 1){
        if(char.length == 5)
            enterClicked();

        if(char.length == 4)
            backClicked();
    }
    else if (char.length == 1){
        writeLetter(char);
    }
}

function writeLetter(char){
    if(currentCell >= 5)
        return null;

    cells = rows["row" + currentRow].getElementsByTagName('div');
    cells[currentCell].innerHTML = char;

    board[currentRow][currentCell] = char;

    currentCell++;
}

function enterClicked(){
    if(currentCell < 5)
        return null;

    let cells = rows["row" + currentRow].getElementsByTagName('div');
    let word = "";
    for(let i = 0; i < cells.length; i++){
        word += cells[i].innerHTML;
    }

    if(possibleWord(word)){
        return null;
    }

    markRow(word);
    checkForWin(word);
    keyBoardUpdate();

    currentCell = 0;
    currentRow++;
}

function markRow(word){
    let cells = rows["row" + currentRow].getElementsByTagName('div');

    for(let i = 0; i < word.length; i++){
        if(wordToGuess[i] == word[i]){
            green.push(word[i]);
            cells[i].style.backgroundColor = "#538d4e";
        }
        else if (wordToGuess.includes(word[i])){
            cells[i].style.backgroundColor = "#b59f3b";
        }
        else{
            gray.push(word[i]);
            cells[i].style.backgroundColor = "#3a3a3c";
        }
    }
}

function backClicked(){
    if(currentCell < 1)
        return null;

    currentCell--;
    cells = rows["row" + currentRow].getElementsByTagName('div');
    cells[currentCell].innerHTML = "";

    board[currentRow][currentCell] = "";
}

function checkForWin(word){
    won = wordToGuess == word ? true : false;
}

function keyBoardUpdate(){
    for(let i = 0; i < green.length; i++){
        let t = document.getElementById(green[i]);
        t.style.backgroundColor = "#538d4e"
        t.style.borderColor = "#538d4e"
    }

    for(let i = 0; i < gray.length; i++){
        let t = document.getElementById(gray[i]);
        t.style.backgroundColor = "#3a3a3c"
        t.style.borderColor = "#3a3a3c"
    }
}

function possibleWord(word){
    return wordsCheck[word] != 1
}