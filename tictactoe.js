// Gameboard will hold the skeleton of the game

function Gameboard() {
    
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const getBoard = () => board; 

    const placeToken = (row, column, player) => {
        if (board[row][column] === "") {
            board[row][column] = player;
            return true;
        }
        return false;
    };
    
    const printBoard = () => {
        const formattedBoard = board.map((row) => row.join(" ")).join("\n");
        console.log(formattedBoard);
    };

    return {getBoard, placeToken, printBoard};
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

    let gameStatus = "active"

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const getStatus = () => gameStatus;

    const checkWinner = () => {
        const winningCombos = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonal
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        const currentBoard = board.getBoard();

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
                
            const tokenA = currentBoard[a[0]][a[1]];
            const tokenB = currentBoard[b[0]][b[1]];
            const tokenC = currentBoard[c[0]][c[1]];

            if (tokenA !== "" && tokenA === tokenB && tokenA === tokenC) {
                return true;
            }
        }
        return false;
    };

    const checkTie = () => {
        return board.getBoard().flat().every((cell) => cell !== "");
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row,column) => {
        if (gameStatus !== "active") return;

        const moveSuccessful = board.placeToken(row, column, getActivePlayer().token);

        if (!moveSuccessful) return;

        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}...`);

        if (checkWinner()) {
            gameStatus = "win";
            return;
        }

        if (checkTie()) {
            gameStatus = "tie";
            return;
        }    

        switchPlayer();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer, getBoard: board.getBoard, getStatus};
}

// ScreenController will be where the input happens and display shown.

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".container");

    const updateScreen = () => {
        boardDiv.textContent = "";
        
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
               
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;

                cellButton.textContent = cell
                boardDiv.appendChild(cellButton);
            });
        });
    };
    const clickHandlerBoard = (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        
        if (selectedRow === undefined || selectedColumn === undefined) return;
        
        game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
        
        updateScreen();
    };

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();

}

ScreenController();