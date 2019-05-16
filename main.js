/*
### # # ###         #
 #  # #  #  # # ### ### ###
 #  ##   #  # # #   # # # #
 #  # #  #  ### #   ### ###
 #  # #  #
*/

var players = [];
var cells = [];

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
    players[0].innerHTML = speler1;
    players[1].innerHTML = speler2;

    var firstPlayer = Math.floor(Math.random() * 2) + 1; // 1 of 2

    for(var i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', clickOnCell)
    }
}

function clickOnCell($hokjeID){
}

function resetEverything(){
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //TODO: Score reset en andere dingen
}