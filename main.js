/*
 ### # # ###         #
  #  # #  #  # # ### ### ###
  #  ##   #  # # #   # # # #
  #  # #  #  ### #   ### ###
  #  # #  #

 https://github.com/TKTurbo/boterKaasEieren
*/

var players = [];
var cells = ["", "", "", "", "", "", "", "", ""];
var clickedCells = [];
var currentPlayer;
var playerNames = [];

var allCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

window.onload = function(){ // Als de pagina volledig is geladen zet dan deze variabelen

    cells = document.getElementsByTagName('td');
    players = [document.getElementById("speler1"), document.getElementById("speler2")]; // De headers met namen van de spelers

    clickedCells = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Alle kaarten in het spel, op volgorder van index

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

    document.getElementById('speler'+currentPlayer).style.color = 'green';

    enableClicking();
}

function clickOnCell(event){
	document.getElementById(event.target.id).removeEventListener('click', clickOnCell);
    if(currentPlayer === 1){
        cells[event.target.id].innerHTML = 'O';
        document.getElementById('speler1').style.color = 'black';
        document.getElementById('speler2').style.color = 'green';
        checkEnd();
        currentPlayer = 2;
    }else if(currentPlayer === 2){
        cells[event.target.id].innerHTML = 'X';
        document.getElementById('speler1').style.color = 'green';
        document.getElementById('speler2').style.color = 'black';
        checkEnd();
        currentPlayer = 1;
    }
}

function reset(){ // Reset ronde-dingen zoals het spelbord en het klikken
    document.getElementById('speler1').style.color = 'black';
    document.getElementById('speler2').style.color = 'black';
    currentPlayer = Math.floor(Math.random() * 2) + 1; // 1 of 2
    document.getElementById('speler'+currentPlayer).style.color = 'green';
	clearCells();
	enableClicking();
	clickedCells = [];
}

function resetEverything(){ // Reset alles
	location.reload();
}

function enableClicking(){ // Zorgt dat je overal op kan klikken
    for(var i = 0; i < cells.length; i++){
        document.getElementById(i).addEventListener('click', clickOnCell);
    }
}

function clearCells(){
	for(var i = 0; i < cells.length; i++){
		document.getElementById(i).innerHTML = "";
	}
}

function checkEnd(){
    for(var i = 0; i < cells.length; i++){
        clickedCells[i] = cells[i].innerHTML; // Array met alle gelikte cellen
    }

    for(var a = 0; a < allCombs.length; a++){
        if(clickedCells[allCombs[a][0]] === "X" && clickedCells[allCombs[a][1]] === "X" && clickedCells[allCombs[a][2]] === "X"){
			alert('Winnaar is ' + playerNames[1] + ' - X');
			addPoints('X');
			break;
        }else if(clickedCells[allCombs[a][0]] === "O" && clickedCells[allCombs[a][1]] === "O" && clickedCells[allCombs[a][2]] === "O"){
        	winner = playerNames[1];
            alert('Winnaar is ' + playerNames[0] + ' - O');
            addPoints('O');
			break;
        }

        if(!clickedCells.includes("")){
			alert('Gelijk!');
			gameEnd();
			break;
		}
    }
    // 012, 345, 678, 036, 147, 258, 047, 246 - Alle mogelijke combinaties
}

function addPoints(winner){
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
		reset()
	}else{
		resetEverything();
	}
}