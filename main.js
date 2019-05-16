window.onload = function(){ // Als de pagina volledig is geladen zet dan deze variabelen

    var cells = document.getElementsByTagName('td');

    var clickedCells = [0, 1]; // 0 is speler 1, 1 is speler 2
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Alle kaarten in het spel, op volgorder van index
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
};

function startGame(){ // Nadat er geklikt is op de startknop
    var speler1 = prompt('Naam speler 1');
    var speler2 = prompt('Naam speler 2');

    var firstPlayer = alert(Math.floor(Math.random() * 2) + 1); // 1 of 2
}

function clickOnCell($hokjeID){
    if(hokje1 == 1){

    }
}

function resetEverything(){
    clickedCells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    clickedCells[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //TODO: Score reset en andere dingen
}