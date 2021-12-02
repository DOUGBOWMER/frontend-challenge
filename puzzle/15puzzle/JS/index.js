// This code also work for 15-puzzle.
// You can add extra tiles inusing html to expand the game play.
window.onload = startup;

function startup() {
    setBoard();
    shuffle();
}

var tiles = document.getElementsByClassName("tile");
tiles = [...tiles]; 
var degree = 3;
var boardSize = degree * degree;
const tilewidth = 70; 
var gameState = "";
var initialArray ; 
var openIndex = 0; // Variable to store the location of open tile.
var shuffledArray = [];

function setBoard() {
    var board = document.getElementsByClassName('puzzle');
    board[0].style.width = tilewidth * degree + 20 + 'px';
    board[0].style.height = tilewidth * degree + 20 + 'px';
    //Create InitialArray
    initialArray= Array.from({ length: boardSize - 1 },(_, i) => i + 1); // inital game state
    initialArray[boardSize - 1] = 0; // Set the open position.
    openIndex = 0;

    // This will be needed if you want to expand to 15-puzzle
    Array(15)
    .fill(0)
    .forEach((v, i) => {
        i < boardSize - 1 ? tiles[i].style.display = 'flex' : tiles[i].style.display = 'none';
    })
}

// add eventListener to all tiles 
tiles.forEach((tile, index) => {
    tile.addEventListener("click", () =>{
        if (gameState) return ;
        checkMoveAbility(index +1); 
    });
});

// call move function when the arrow keys pressed 
document.addEventListener("keydown", function (event) {
    if(gameState) return;
    if (event.key == "ArrowLeft" && openIndex + 1 < boardSize) {
       checkMoveAbility(shuffledArray[openIndex + 1]); 
    } else if (event.key == "ArrowUp" && openIndex + degree < boardSize){
        checkMoveAbility(shuffledArray[openIndex + degree]);
    } else if (event.key == "ArrowRight" && openIndex - 1 >= 0) {
        checkMoveAbility(shuffledArray[openIndex - 1]);
    } else if ( event.key == "ArrowDown" && openIndex - degree >= 0){
        checkMoveAbility(shuffledArray[openIndex - degree]);
    }
});

function shuffle () {
    //create a shuffled Array to initiate the Game. 
    // Declare the 4 posible directions for the empty space.
    const delta = [-degree, -1, 1, degree];
    shuffledArray = initialArray;
    openIndex = boardSize - 1;

    // Make random movement of empty space 1000 times 
    // without this an unsolvable game state can occur
    Array(1000)
    .fill(0)
    .forEach(() => {
        // Set the next position of empty space randomly.
        const x = openIndex + delta[parseInt(4 * Math.random())]; 
        if (
            x > 0 &&
            x < boardSize &&
            (parseInt(openIndex / degree) == parseInt(x / degree) ||
                openIndex % degree == x % degree) //Exclude any imposible movements that can happen when 
        ) {                                       //the current position of empty space is im the corner.   
            // Move empty space to generated next position.
            shuffledArray[openIndex] = shuffledArray[x];
            shuffledArray[x] = 0;
            openIndex = x;    
        }
    });

    //rearrange the Tiles with the shuffledArray
    shuffledArray.map(
        (value, index) => value && moveTile(value, parseInt(index / degree), index % degree)
    );
}

//Function to check the movability of a tile, and move tile if posible.
function checkMoveAbility(tileNumber) {
    var currentPos = shuffledArray.indexOf(tileNumber);
    // directDelta reffer to the step of movement.
    // It is 1 if the open position and current tile are in the same row.
    var directDelta = 0;
    directDelta = parseInt(currentPos / degree) == parseInt(openIndex / degree) ? 1 : 0;
    // If they are not in the same row, check if they are in the same col and set the directDelta 3
    if(!directDelta) directDelta = parseInt(currentPos % degree) == parseInt(openIndex % degree) ? degree : 0;

    // If the movement is possible the directDelta won't be 0.
    if(directDelta) {
        // Distance between open position and clicked tile.
        const dist = Math.abs(openIndex - currentPos);
        // Direction of movement.
        // It will be 1 if the openIndex is bigger than clicked position.
        const direction = (openIndex - currentPos) / dist;

        // Divide the distance by directDelta to get the number of tiles to move.
        // And make a loop
        Array(dist / directDelta)
        .fill(0)
        .forEach(() => {
            // We move all tiles between the clicked position and the position of blank tile one by one in this loop.
            // currentPos means the postion of each tile to move.
            currentPos = openIndex - direction * directDelta;
            // Swap the current tile and blank tile in shuffledArray.
            shuffledArray[openIndex] = shuffledArray[currentPos];
            // Call a function to move the current tile to blank position.
            moveTile(shuffledArray[currentPos], parseInt(openIndex / degree), openIndex % degree);
            shuffledArray[currentPos] = 0;
            openIndex = currentPos;
        })
    }
}

// Function to move a tile to specific position.
function moveTile(tileNumber, row, col) {
    // Set the left and top of clicked tile to move it.
    tiles[tileNumber - 1].style.left = col * tilewidth + 10 + "px";
    tiles[tileNumber - 1].style.top = row * tilewidth + 10 + "px";

    setTimeout(checkWin, 100);
}

// Function to check the GameState.
function checkWin() {
    // If shuffledArray is [1,2,3,4,5,6,...] ...
    if (shuffledArray.findIndex((v, i) => v != (i + 1) % boardSize) == -1) {
        alert('Win');
        gameState = 'win';
    }
}

// Function to switch the degree of board. I set this funtion so this code can also be used for 15-puzzle.
function selectDegree(selectedObject) {
    degree = parseInt(selectedObject.value);
    boardSize = degree * degree;
    setBoard();
    shuffle();
    gameState = '';
}
