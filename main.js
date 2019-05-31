/*
 ### # # ###         #
  #  # #  #  # # ### ### ###
  #  ##   #  # # #   # # # #
  #  # #  #  ### #   ### ###
  #  # #  #

 https://github.com/TKTurbo/boterKaasEieren
*/

// Declaratie globale variabelen.

var players = []; // De elementen van de headers met namen.
var cells = ["", "", "", "", "", "", "", "", ""]; // Alle cellen die later worden geselecteerd.
var clickedCells = []; // Alle cellen waarop geklikt is.
var currentPlayer;
var playerNames = [];

var allCombs = [ // Alle mogelijke combinaties.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

window.onload = function(){ // Als de pagina volledig is geladen zet dan deze variabelen.

    cells = document.getElementsByTagName('td');
    players = [document.getElementById("speler1"), document.getElementById("speler2")]; // De headers met namen van de spelers

    clickedCells = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Alle kaarten in het spel, op volgorder van index.

    document.getElementById('gameButton').addEventListener('click', startGame);
};

function startGame(){ // Nadat er geklikt is op de startknop
    document.getElementById('gameButton').removeEventListener('click', startGame);
    document.getElementById('gameButton').innerHTML = 'Reset';
    document.getElementById('gameButton').addEventListener('click', resetEverything);
    playerNames[0] = prompt('Naam speler O');
    playerNames[1] = prompt('Naam speler X');
    players[0].innerHTML = playerNames[0] + ' = O';
    players[1].innerHTML = playerNames[1] + ' = X';

    currentPlayer = Math.floor(Math.random() * 2) + 1; // 1 of 2

    document.getElementById('speler'+currentPlayer).style.color = 'white';

    enableClicking();
}

function clickOnCell(event){
	document.getElementById(event.target.id).removeEventListener('click', clickOnCell); // Zorgt ervoor dat je niet op een cell kan klikken waarop al geklikt is.
    if(currentPlayer === 1){
        cells[event.target.id].innerHTML = 'O';
        document.getElementById('speler1').style.color = 'black';
        document.getElementById('speler2').style.color = 'white';
        checkEnd();
        currentPlayer = 2;
    }else if(currentPlayer === 2){
        cells[event.target.id].innerHTML = 'X';
        document.getElementById('speler1').style.color = 'white';
        document.getElementById('speler2').style.color = 'black';
        checkEnd();
        currentPlayer = 1;
    }
}

function reset(){ // Reset ronde-dingen zoals het spelbord en het klikken.
    currentPlayer = Math.floor(Math.random() * 2) + 1; // 1 of 2
    clickedCells = [];
    clearCells();
    setTimeout(function(){ // Door een delay van de Math.floor functie kan de kleur eerder gezet worden en zijn de spelers verkeerd.
        document.getElementById('speler1').style.color = 'black';
        document.getElementById('speler2').style.color = 'black';
        document.getElementById('speler'+currentPlayer).style.color = 'white';
    }, 1000);
	enableClicking();
}

function resetEverything(){ // Herlaad de pagina wat de makkelijkste manier is om alles te resetten.
	location.reload();
}

function enableClicking(){ // Zorgt dat je overal op kan klikken.
    for(var i = 0; i < cells.length; i++){
        document.getElementById(i).addEventListener('click', clickOnCell);
    }
}

function clearCells(){ // Haal alle cells leeg van X of O.
	for(var i = 0; i < cells.length; i++){
		document.getElementById(i).innerHTML = "";
	}
}

function checkEnd(){ // Kijkt elke zet of het spel eindigt
    for(var i = 0; i < cells.length; i++){
        clickedCells[i] = cells[i].innerHTML; // Array met alle gelikte cellen om het iets leesbaarder te maken in de volgende loop.
    }

    for(var a = 0; a < allCombs.length; a++) { // a was iets leesbaarder omdat het eerder samen zat.

        /*
        * Voorbeeld:
        * Index 0 is ['0', '1', '2']
        * Als 'geklikteCells' a (met index 0) en uit die twee-dimensionale array 0 x is, 1 x is en 2 x is is het een match.
        * Dit blijft het doen met elke combinatie uit de array 'allCombs' om te kijken of er een match is als dat nog niet zo is.
        */

        if (clickedCells[allCombs[a][0]] === "X" && clickedCells[allCombs[a][1]] === "X" && clickedCells[allCombs[a][2]] === "X") {
            alert('Winnaar is ' + playerNames[1] + ' - X');
            addPoints('X');
            return;
            break;
        } else if (clickedCells[allCombs[a][0]] === "O" && clickedCells[allCombs[a][1]] === "O" && clickedCells[allCombs[a][2]] === "O") {
            winner = playerNames[1];
            alert('Winnaar is ' + playerNames[0] + ' - O');
            addPoints('O');
            return;
            break;
        }
    }
    for(var b = 0; b < allCombs.length; b++){
        if(!clickedCells.includes("")){ // Als de array 'clickedCells' geen spatie bevat betekent het dat alles geklikt is en dat er geen match is, dus gelijkspel.
			alert('Gelijk!');
			gameEnd(); // Voegt geen punten toe en eindigt direct
			break;
		}
    }
    // 012, 345, 678, 036, 147, 258, 047, 246 - Alle mogelijke combinaties
}

function addPoints(winner){ // Voegt punten toe in de span onder de naam van de speler.
	if(winner === 'O'){
		document.getElementById("ps1").innerHTML++;
	}else if(winner === 'X'){
		document.getElementById("ps2").innerHTML++;
	}
	gameEnd();
}

function gameEnd(){
	var again = confirm('Nog een keer?');

	if(again === true){
		reset() // Reset het speelveld maar laat de punten staan.
	}else{
		resetEverything(); // Herlaad de pagina om opnieuw te beginnen.
	}
}