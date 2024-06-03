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
    if(value < 0 || value > 1){
      console.log("Invalid value for currentPlayerIndex");
      return;
    }
    this.#currentPlayerIndex = value;
  }

  startGame = () => {
    console.log("TIC-TAC-TOE");
    this.gameBoard.printBoard();
    this.playTurn();
  }

  playTurn = () => {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const [row, col] = prompt(
      `${currentPlayer.name} (${currentPlayer.symbol}), enter your move (row, col):`,
    )
      .split(",")
      .map(Number);

    if(this.gameBoard.updateBoard(row, col, currentPlayer.symbol)) {
      this.gameBoard.printBoard();

      if (this.gameBoard.checkWin(currentPlayer.symbol)) {
        console.log(`${currentPlayer.name} wins!`);
        return;
      }

      if(this.gameBoard.isFull()) {
        console.log("It's a tie!");
        return;
      }

      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      this.playTurn();
    } else {
      console.log("Invalid move, try again.");
      this.playTurn();
    }
  }
}

const game = new GameFlow();
game.startGame();

