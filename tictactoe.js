// Gameboard is this an object? This will hold the logic below

function Gameboard() {
    
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    // Personal note, grid will be referred as board[rowIndex][columnIndex]
    // ex: board
    // [0][0], [0][1], [0][2]
    // [1][0], [1][1], [1][2]
    // [2][0], [2][1], [2][2]

    const getBoard = () => board; 

    // need a const that will place token in spots
    
    const printBoard = () => {
        const formattedBoard = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };

    return {getBoard, printBoard};

}

// const testGameboard = Gameboard();
// console.log(testGameboard.getBoard());

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

    const playRound = (row,column) => {
        printNewRound();
        switchPlayer();
    };

    printNewRound();

    return {playRound, getActivePlayer, getBoard: board.getBoard};
}

function gameWinner() {
    const winningCombos = [
        // Vertical
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Horizontal
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonal
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    // board needs to check which of the tokens populate the cells
    // cells need to have matching token WITH combination above to win
    // if entire board is filled, game will end with draw (should this go with event handler)

    // need to include current state of the board (what is state of board)
    if (getBoard = (winningCombos = "x" || "o")) {
        return (`${getActivePlayer}`);
    }
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
                cellButton.dataset.column = index; // i think i remove this
                cellButton.textContent = cell.getValue(); // i think this too
                boardDiv.appendChild(cellButton);
            });
        });
    };
}



function clickHandlerBoard(e) {
    const selectCell = document.querySelect("button");
    selectCell.addEventListener("click", (event) => {
        // if the cell is blank, then it can populate
        // depending on active player, cell/button will populate with token "x" or "o"
        // needs to check winner
        // if no winner, then continue with game
        // if 
        
    }    
        
    
    )

}

ScreenController();