var wordToGuess = getWordToGuess();
var won = false;

const rowLettersCap = 5;
const rowsCap = 6;

var currentRow = 0;
var currentCell = 0;

var boardDiv = document.getElementById('board');
var boardRows = boardDiv.getElementsByTagName('div');

var keyboardDiv = document.getElementById('keyboard');
var keyboardRows = keyboardDiv.getElementsByTagName('div');

var colorGreen = "#538d4e";
var colorYellow = "#b59f3b";
var colorGray = "#3a3a3c";

let green = [];
let gray = [];

var wordsCheck = JSON.parse(dataCheck)[0];

document.addEventListener('keyup', e => {
    if(e.key == "Enter"){
        rowManager("enter");
    }
    else if(e.key == "Backspace"){
        rowManager("back");
    }
    else if(e.key.toUpperCase() != e.key.toLowerCase()){
        rowManager(e.key.toLowerCase());
    }
})

function keyClicked(key){
    char = String(key.getAttribute("data-key"));
    rowManager(char);
}

function rowManager(c){
    let char = c;

    if(won) return null;
    if(currentRow > rowsCap - 1) return null;

    if(char.length > 1){
        if(char.length == 5) // enter
            enterClicked();

        if(char.length == 4) // back
            backClicked();
    }
    else if (char.length == 1){
        writeLetter(char);
    }
}

function getWordToGuess(){
    var words = JSON.parse(dataRandom)[0];
    let word = words[Math.floor(Math.random() * Object.keys(words).length)];
    console.log(word);
    return word;
}

function writeLetter(char){
    if(currentCell >= rowLettersCap)
        return null;

    cells = getCurrentCells()
    cells[currentCell].innerHTML = char;

    currentCell++;
}

function enterClicked(){
    if(currentCell < rowLettersCap)
        return null;

    let cells = getCurrentCells();
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
    let cells = getCurrentCells();

    for(let i = 0; i < word.length; i++){
        if(wordToGuess[i] == word[i]){
            green.push(word[i]);
            cells[i].style.backgroundColor = colorGreen;
            cells[i].style.borderColor = colorGreen;
        }
        else if (wordToGuess.includes(word[i])){
            cells[i].style.backgroundColor = colorYellow;
            cells[i].style.borderColor = colorYellow;
        }
        else{
            gray.push(word[i]);
            cells[i].style.backgroundColor = colorGray;
            cells[i].style.borderColor = colorGray;
        }
    }
}

function backClicked(){
    if(currentCell < 1)
        return null;

    currentCell--;
    cells = getCurrentCells();
    cells[currentCell].innerHTML = "";
}

function keyBoardUpdate(){
    for(let i = 0; i < green.length; i++){
        let t = document.getElementById(green[i]);
        t.style.backgroundColor = colorGreen;
        t.style.borderColor = colorGreen;
    }

    for(let i = 0; i < gray.length; i++){
        let t = document.getElementById(gray[i]);
        t.style.backgroundColor = colorGray;
        t.style.borderColor = colorGray;
    }
}

function possibleWord(word){
    return wordsCheck[word] != 1
}

function checkForWin(word){
    won = wordToGuess == word ? true : false;
}

function getCurrentCells(){
    return boardRows["row" + currentRow].getElementsByTagName('div');
}