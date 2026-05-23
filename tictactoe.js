// Gameboard is this an object? This will hold the logic below

function Gameboard() {
    
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    // Personal note, grid will be referred as board[rowIndex][columnIndex]
    // ex: board[0][0], [0][1], [0][2]
    // [1][0], [1][1], [1][2]
    // [2][0], [2][1], [2][2]

    const getBoard = () => board;      

    return {getBoard};

}

const testGameboard = Gameboard();
console.log(testGameboard.getBoard());

// Cell logic, this will show what should happen to the cell when you click on it and stuff

function Cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue,
    };
}

// GameController will be how the game works

function GameController (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();
    
    const players = [
        {
            name: playerOneName,
            token: "x",
        },
        {
            name: playerTwoName,
            token: "o",
        },
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = () => {
        printNewRound();
        switchPlayer();
    };

    return {playRound, getActivePlayer, getBoard: board.getBoard};
}

function ScreenController() {
    const game = GameController();
    // const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".container");

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        // Render board squares
        board.forEach((row) => {
            row.forEach((cell, index) => {
                // Anything clickable should be a button!!
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // Create a data attribute to identify the column
                // This makes it easier to pass into our `playRound` function
                cellButton.dataset.column = index;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    };
}

function clickHandlerBoard(e) {
    const selectCell = document.querySelect
}

ScreenController();