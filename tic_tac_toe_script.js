let playerCross = "X";
let playerZero = "O";
let playerCrossWins = 0;
let playerCrossloses = 0;
let playerZeroWins = 0;
let playerZeroloses = 0;
let currentPlayer = playerCross;
let cells = Array.from(document.querySelectorAll(".box"));
let resetButton = document.querySelector(".reset");
let gameStart = document.querySelector(".game-start");
let cellStatus = ["", "", "", "", "", "", "", "", ""];
let message = document.querySelector(".turn");
let clickSoundEffect = new Audio("clickSoundEffect.mp3");
let isGameOver = false;
let winStatus = false;
let player1Wins = document.querySelector(".player1-wins");
let player1loses = document.querySelector(".player1-loses");
let player2wins = document.querySelector(".player2-wins");
let player2loses = document.querySelector(".player2-loses");
let popupContainerDisplay = document.querySelector(".popup-container");
let popupWinningMessage = document.querySelector(".winning-popup-msg");

// function to start the game
/* function main() {
  document.getElementById("abc").style.display = "none";
  document.getElementById("container").style.display = "flex";
  restartGame();
} */
showMessage(`Turn of ${currentPlayer}`);
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
});

// function to handle the cell click event
function cellClicked(e) {
  const cellIndex = e.target.getAttribute("index");
  if (cellStatus[cellIndex] === "") {
    // clickSoundEffect.play();
    cellStatus[cellIndex] = currentPlayer;
    e.target.value = currentPlayer;
    console.log(cellStatus);
    winStatus = checkWinner();
    if (winStatus) {
      popupContainerDisplay.style.display = "flex";

      cells.forEach((cell) => {
        cell.disabled = true;
      });
      // console.log(currentPlayer, "aaaa");
      showMessage(currentPlayer + " has won");
      popupWinningMessage.innerText = currentPlayer + " has won";
      if (currentPlayer == playerCross) {
        playerCrossWins++;
        playerZeroloses++;
        player1Wins.innerText = "WINS " + playerCrossWins;
        player2loses.innerText = "LOSES " + playerZeroloses;
      } else if (currentPlayer == playerZero) {
        playerZeroWins++;
        playerCrossloses++;
        player2wins.innerText = "WINS " + playerZeroWins;
        player1loses.innerText = "LOSES " + playerCrossloses;
      }
      isGameOver = true;
      return;
    }
    changePlayer();
    isGameDraw();
    if (!isGameOver) {
      showMessage(`Turn of ${currentPlayer}`);
    }
  }
}
// function to change the player
function changePlayer() {
  currentPlayer = currentPlayer === playerCross ? playerZero : playerCross;
}

// function to check the winning condition
function checkWinner() {
  let win = false;
  let a, b, c;
  for (let i = 0; i < winConditions.length; i++) {
    a = cells[winConditions[i][0]].value;
    b = cells[winConditions[i][1]].value;
    c = cells[winConditions[i][2]].value;
    win = a === b && b === c && a !== "";
    if (win) {
      cells[winConditions[i][0]].style.fontSize = "4rem";
      cells[winConditions[i][1]].style.fontSize = "4rem";
      cells[winConditions[i][2]].style.fontSize = "4rem";
      // cells[winConditions[i][0]].style.backgroundColor = "yellow";
      // cells[winConditions[i][1]].style.backgroundColor = "yellow";
      // cells[winConditions[i][2]].style.backgroundColor = "yellow";
      break;
    }
  }
  return win;
}

// function to restart  the game
function restartGame() {
  cells.forEach((cell) => {
    cell.value = "";
    cell.disabled = false;
    cell.style.fontSize = "3rem";
  });
  currentPlayer = playerCross;
  cellStatus = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  popupContainerDisplay.style.display = "none";

  showMessage(`Turn of ${currentPlayer}`);
}

// function to show the displayed message
function showMessage(msg) {
  message.innerText = msg;
}

// function to check draw
function isGameDraw() {
  let roundDraw = !cellStatus.includes("");
  if (roundDraw && !winStatus) {
    showMessage("Match is draw");
    isGameOver = true;
    return;
  }
}
