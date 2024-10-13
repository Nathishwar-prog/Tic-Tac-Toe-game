document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const newGameButton = document.getElementById("newGameButton");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const playAgainButton = document.getElementById("playAgainButton");
    let currentPlayer = "X";
    let gameActive = true;
    const boardState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (boardState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            resultMessage.textContent = `Player ${currentPlayer} wins!`;
            showResultScreen();
            gameActive = false;
            return;
        }

        if (!boardState.includes("")) {
            resultMessage.textContent = "It's a draw!";
            showResultScreen();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const checkWinner = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    };

    const showResultScreen = () => {
        resultScreen.classList.add("show");
    };

    const restartGame = () => {
        currentPlayer = "X";
        gameActive = true;
        boardState.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o');
        });
        resultScreen.classList.remove("show");
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    newGameButton.addEventListener("click", restartGame);
    playAgainButton.addEventListener("click", restartGame);
});