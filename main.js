/*
 ### # # ###         #
  #  # #  #  # # ### ### ###
  #  ##   #  # # #   # # # #
  #  # #  #  ### #   ### ###
  #  # #  #

 https://github.com/TKTurbo/boterKaasEieren
*/

var players = [];
var cells = [];
var clickedCells = [];
var currentPlayer;

window.onload = function(){ // Als de pagina volledig is geladen zet dan deze variabelen

    cells = document.getElementsByTagName('td');
    players = [document.getElementById("speler1"), document.getElementById("speler2")]; // De headers met namen van de spelers

    var clickedCells = [0, 1]; // 0 is speler 1, 1 is speler 2
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Alle kaarten in het spel, op volgorder van index
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    document.getElementById('gameButton').addEventListener('click', startGame);
};

function startGame(){ // Nadat er geklikt is op de startknop
    document.getElementById('gameButton').removeEventListener('click', startGame);
    document.getElementById('gameButton').innerHTML = 'Reset';
    document.getElementById('gameButton').addEventListener('click', reloadPage);
    var speler1 = prompt('Naam speler 1');
    var speler2 = prompt('Naam speler 2');
    players[0].innerHTML = speler1 + ' = O';
    players[1].innerHTML = speler2 + ' = X';

    currentPlayer = Math.floor(Math.random() * 2) + 1; // 1 of 2

    enableClicking();
}

function clickOnCell(event){
    if(currentPlayer === 1){
        cells[event.target.id].innerHTML = 'O';
        checkEnd();
        currentPlayer = 2;
    }else if(currentPlayer === 2){
        cells[event.target.id].innerHTML = 'X';
        checkEnd();
        currentPlayer = 1;
    }
}

function reloadPage(){
    var quit = confirm('Zeker weten?');
    if(quit === true){
        location.reload();
    }
}

function enableClicking(){
    for(var i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', clickOnCell)
    }
}

function disableClicking(){
    for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', clickOnCell)
    }
}

function checkClicked(event){ // Kijkt of er al op de knop geklikt is
    if(cells[event.target.id].innerHTML !== ''){
        return true;
    }else{
        return false;
    }
}

function checkEnd(){
    for(var i = 0; i < cells.length; i++){
        clickedCells[i] = cells[i].innerHTML; // Array met alle gelikte cellen en
    }

    if(clickedCells[0] && clickedCells[1] && clickedCells[2] === 'X' // TODO: Refactoring?
        || clickedCells[3] && clickedCells[4] && clickedCells[5] === 'X'
        || clickedCells[6] && clickedCells[7] && clickedCells[8] === 'X'
        || clickedCells[0] && clickedCells[3] && clickedCells[6] === 'X'
        || clickedCells[1] && clickedCells[4] && clickedCells[7] === 'X'
        || clickedCells[2] && clickedCells[5] && clickedCells[8] === 'X'
        || clickedCells[0] && clickedCells[4] && clickedCells[7] === 'X'
        || clickedCells[2] && clickedCells[4] && clickedCells[6] === 'X'){
        alert(currentPlayer + ' heeft gewonnen!')
    }else if(clickedCells[0] && clickedCells[1] && clickedCells[2] === 'O' // TODO: Refactoring?
        || clickedCells[3] && clickedCells[4] && clickedCells[5] === 'O'
        || clickedCells[6] && clickedCells[7] && clickedCells[8] === 'O'
        || clickedCells[0] && clickedCells[3] && clickedCells[6] === 'O'
        || clickedCells[1] && clickedCells[4] && clickedCells[7] === 'O'
        || clickedCells[2] && clickedCells[5] && clickedCells[8] === 'O'
        || clickedCells[0] && clickedCells[4] && clickedCells[7] === 'O'
        || clickedCells[2] && clickedCells[4] && clickedCells[6] === 'O') {
        alert(currentPlayer + ' heeft gewonnen!')
    }

    // 012, 345, 678, 036, 147, 258, 047, 246 - Alle mogelijke combinaties
}