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

  resetBoard = () => {
    this.gameboardArr = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
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
  #players = [];
  //#players = [new Player("Player 1", "X"), new Player("Player 2", "O")];
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

  startGame = (player1Name, player2Name) => {
    //console.log("TIC-TAC-TOE");
    //this.gameBoard.printBoard();
    this.#players = [
      new Player(player1Name, "X"),
      new Player(player2Name, "O"),
    ];
    this.restartGame();
  };

  playTurn = (cellID) => {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const [row, col] = cellID.split(",").map(Number);
    this.#displayHandler.printCurrentPlayer(currentPlayer.name);

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
        document.getElementById("restart-game").style.display = "inline";
        return;
      }

      if (this.gameBoard.isFull()) {
        console.log("It's a tie!");
        this.#displayHandler.printWinner("It's a tie!");
        this.#displayHandler.disableCells();
        document.getElementById("restart-game").style.display = "inline";
        return;
      }

      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      this.#displayHandler.printCurrentPlayer(
        this.players[this.currentPlayerIndex].name,
      );
    } else {
      console.log("Invalid move, try again.");
      this.#displayHandler.printWinner("Invalid move, try again.");
    }
  };

  handleCellClick = (event) => {
    this.playTurn(event.target.id);
  };

  restartGame = () => {
    this.#gameBoard.resetBoard();
    this.#currentPlayerIndex = 0;
    this.#displayHandler.printBoard(this.#gameBoard.gameboardArr);
    this.#displayHandler.printCurrentPlayer(
      this.players[this.currentPlayerIndex].name,
    );
    this.#displayHandler.enableCells();
    this.#displayHandler.printWinner("");

    this.#displayHandler.gameCells.forEach((cell) => {
      cell.removeEventListener("click", this.handleCellClick);
      cell.addEventListener("click", this.handleCellClick);
    });

    document.getElementById("restart-game").style.display = "none";
  };
}

class DisplayHandler {
  #gameCells = document.querySelectorAll(".cell");
  #winnerDisplay = document.querySelector(".winner");
  #currentPlayerDisplay = document.querySelector(".current-player");

  get gameCells() {
    return this.#gameCells;
  }

  get currentPlayerDisplay() {
    return this.#currentPlayerDisplay;
  }

  get winnerDisplay() {
    return this.#winnerDisplay;
  }

  printBoard = (boardArr) => {
    let flatBoard = boardArr.flat();

    this.#gameCells.forEach((cell, index) => {
      cell.textContent = flatBoard[index];
    });
  };

  printCurrentPlayer = (text) => {
    this.currentPlayerDisplay.textContent = `${text}'s turn`;
  };

  printWinner = (text) => {
    this.winnerDisplay.textContent = text;
  };

  disableCells = () => {
    this.gameCells.forEach((cell) => {
      cell.setAttribute("disabled", "true");
    });
  };

  enableCells = () => {
    this.gameCells.forEach((cell) => {
      cell.removeAttribute("disabled");
    });
  };
}

let game = new GameFlow();

document.getElementById("start-game").addEventListener("click", () => {
  const player1Name =
    document.getElementById("player1-name").value || "Player 1";
  const player2Name =
    document.getElementById("player2-name").value || "Player 2";

  game.startGame(player1Name, player2Name);

  document.getElementById("player1-name").value = "";
  document.getElementById("player2-name").value = "";
});

document.getElementById("restart-game").addEventListener("click", () => {
  game.restartGame();
});
