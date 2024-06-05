class GameBoard {
  gameboardArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  winConditions = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],

    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],

    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  printBoard = () => {
    for (let row of this.gameboardArr) {
      console.log(row.join(" | "));
    }
  };

  updateBoard = (row, col, playerSymbol) => {
    if (this.gameboardArr[row][col] == "") {
      this.gameboardArr[row][col] = playerSymbol;
      return true;
    }
    return false;
  };

  checkWin = (playerSymbol) =>
    this.winConditions.some((condition) =>
      condition.every(
        ([row, col]) => this.gameboardArr[row][col] === playerSymbol,
      ),
    );

  isFull = () =>
    this.gameboardArr.every((row) => row.every((col) => col !== ""));
}

class Player {
  name;
  #symbol = "";

  constructor(name, symbol) {
    this.name = name;
    this.#symbol = symbol;
  }

  get symbol() {
    return this.#symbol;
  }
}

class GameFlow {
  #gameBoard = new GameBoard();
  #players = [new Player("Player 1", "X"), new Player("Player 2", "O")];
  #displayHandler = new DisplayHandler();
  #currentPlayerIndex = 0;

  get gameBoard() {
    return this.#gameBoard;
  }

  get players() {
    return this.#players;
  }

  get currentPlayerIndex() {
    return this.#currentPlayerIndex;
  }

  set currentPlayerIndex(value) {
    if (value < 0 || value > 1) {
      console.log("Invalid value for currentPlayerIndex");
      return;
    }
    this.#currentPlayerIndex = value;
  }

  startGame = () => {
    //console.log("TIC-TAC-TOE");
    //this.gameBoard.printBoard();
    this.#displayHandler.printBoard(this.gameBoard.gameboardArr);

    this.#displayHandler.gameCells.forEach((cell) => cell.addEventListener("click", (event) => {
      this.playTurn(event.target.id);
    }));
  }

  playTurn = (cellID) => {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const [row, col] = cellID.split(",").map(Number);
    this.#displayHandler.printCurrentPlayer(`${currentPlayer.name} placed on cell: (${row + 1}, ${col + 1})`);

    /*
    const [row, col] = prompt(
      `${currentPlayer.name} (${currentPlayer.symbol}), enter your move (row, col):`,
    )
      .split(",")
      .map(Number);
    */

    if (this.gameBoard.updateBoard(row, col, currentPlayer.symbol)) {

      this.#displayHandler.printBoard(this.gameBoard.gameboardArr);
      this.gameBoard.printBoard();

      if (this.gameBoard.checkWin(currentPlayer.symbol)) {
        console.log(`${currentPlayer.name} wins!`);
        this.#displayHandler.printWinner(`${currentPlayer.name} wins!`);
        this.#displayHandler.disableCells();
        return;
      }

      if (this.gameBoard.isFull()) {
        console.log("It's a tie!");
        this.#displayHandler.printWinner("It's a tie!");
        this.#displayHandler.disableCells();
        return;
      }

      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    } else {
      console.log("Invalid move, try again.");
      this.#displayHandler.printWinner("Invalid move, try again.");
      this.playTurn(cellID);
    }
  }
}

class DisplayHandler {
  #gameCells = document.querySelectorAll(".cell");
  #winnerDisplay = document.querySelector(".winner");
  #currentPlayerDisplay = document.querySelector(".current-player");

  get gameCells(){
    return this.#gameCells;
  }

  get currentPlayerDisplay(){
    return this.#currentPlayerDisplay;
  }

  get winnerDisplay(){
    return this.#winnerDisplay;
  }

  printBoard = (boardArr) => {
    let flatBoard = boardArr.flat();

    this.#gameCells.forEach((cell, index) => {
      cell.textContent = flatBoard[index];
    });
  }

  printCurrentPlayer = (text) => {
    this.currentPlayerDisplay.textContent = text;
  }

  printWinner = (text) => {
    this.winnerDisplay.textContent = text;
  }

  disableCells = () => {
    this.gameCells.forEach((cell) => {
      cell.setAttribute("disabled", "true");
    })
  }

  enableCells = () => {
    this.gameCells.forEach((cell) => {
      cell.removeAttribute("disabled");
    })
  }
}

const game = new GameFlow();
game.startGame();
