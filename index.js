class GameBoard {
  gameboardArr = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]
  ];

  winConditions = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  printBoard = () => {
    for(let row of this.gameboardArr){
      console.log(row.join(" | "));
    }
  }

  updateBoard = (row, col, playerSymbol) => {
    if(this.gameboardArr[row][col] == ""){
      this.gameboardArr[row][col] = playerSymbol;
      return true;
    }
    return false;
  }

  checkWin = (playerSymbol) => this.winConditions.some((condition) => condition.every(([row, col]) => this.gameboardArr[row][col] === playerSymbol));

  isFull = () => this.gameboardArr.every(row => row.every(col => col !== ""));
}

class Player {
  name;
  #symbol = "";

  constructor(name, symbol) {
    this.name = name;
    this.#symbol = symbol;
  }

  get symbol(){
    return this.#symbol;
  }

}


class GameFlow {
  gameBoard = new GameBoard();

  intro = () => {
    console.log("TIC-TAC-TOE");
    this.gameBoard.printBoard();
    this.gameStart();
  }

  
  gameStart = () => {
    let player1 = new Player("Player 1", "X");
    let player2 = new Player("Player 2", "O");

    let coordsPlayer1 = prompt("Coordenadas p1: ").split(",").map((val) => parseInt(val));
    let coordsPlayer2 = prompt("Coordenadas p2: ").split(",").map((val) => parseInt(val));

  }
}

let gameHandler = new GameFlow();
gameHandler.intro();
