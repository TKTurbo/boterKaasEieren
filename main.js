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
var currentPlayer;

window.onload = function(){ // Als de pagina volledig is geladen zet dan deze variabelen

    cells = document.getElementsByTagName('td');
    players = [document.getElementById("speler1"), document.getElementById("speler2")]; // De headers met namen van de spelers

    var clickedCells = [0, 1]; // 0 is speler 1, 1 is speler 2
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Alle kaarten in het spel, op volgorder van index
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
};

function startGame(){ // Nadat er geklikt is op de startknop
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
    }else if(currentPlayer === 2){;
        cells[event.target.id].innerHTML = 'X';
    }
}

function resetEverything(){
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //TODO: Score reset en andere dingen
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