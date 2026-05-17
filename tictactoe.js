// Gameboard is this an object? This will hold the logic below

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
}

// Cell logic, this will show what should happen to the cell when you click on it and stuff

function Cell() {

}

// GameController will be how the game works

function GameController () {

}

const game = GameController();