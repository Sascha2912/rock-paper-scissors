'usestrict';

// === DOM-Elemente ===
const rockImageElement = document.getElementById("rock-image-element");
const paperImageElement = document.getElementById("paper-image-element");
const scissorsImageElement = document.getElementById("scissors-image-element");
const roundCounterElement = document.getElementById("round-counter-element");
const playerChoiseElement = document.getElementById("player-choice-element");
const computerChoiceElement = document.getElementById("computer-choice-element");
const scoreCounterElement = document.getElementById("score-counter-element");
const compareElement = document.getElementById("compare-element");
const resultElement = document.getElementById("result-element");
const messageElement = document.getElementById("message-element");
const btnNEwRound = document.getElementById("btn-new-round");

// === Spielvariablen ===
const imagePathRockPaperScissors = ["src/img/rock.jpg", "src/img/paper.jpg", "src/img/scissors.jpg"];
let playerChoise = 0;
let computerChoise = 0;
let playerPoints = 0;
let computerPoints = 0;
let currentRound = 0;
let isGameAlive = true;

const getComputerChoise = () => {
    return Math.floor(Math.random() * 3);
};

const evaluateRound = (playerSelection, computerSelection) => {
    compareElement.style.display = "block";
    if (playerSelection === 0){
        if (computerSelection === 0) {
            currentRound++;
            roundCounterElement.style.color = "darkslategray";
            roundCounterElement.textContent = `Round ${currentRound} DRAW!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 1) {
            currentRound++;
            computerPoints++;
            roundCounterElement.style.color = "darkred";
            roundCounterElement.textContent = `Round ${currentRound} YOU LOSE!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 2) {
            currentRound++;
            playerPoints++;
            roundCounterElement.style.color = "green";
            roundCounterElement.textContent = `Round ${currentRound} YOU WON!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }
    }

    if (playerSelection === 1){
        if (computerSelection === 0) {
            currentRound++;
            playerPoints++;
            roundCounterElement.style.color = "green";
            roundCounterElement.textContent = `Round ${currentRound} YOU WON!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 1) {
            currentRound++;
            roundCounterElement.style.color = "darkslategray";
            roundCounterElement.textContent = `Round ${currentRound} DRAW!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 2) {
            currentRound++;
            computerPoints++;
            roundCounterElement.style.color = "darkred";
            roundCounterElement.textContent = `Round ${currentRound} YOU LOSE!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        } 
    }

    if (playerSelection === 2){
        if (computerSelection === 0) {
            currentRound++;
            computerPoints++;
            roundCounterElement.style.color = "darkred";
            roundCounterElement.textContent = `Round ${currentRound} YOU LOSE!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 1) {
            currentRound++;
            playerPoints++;
            roundCounterElement.style.color = "green";
            roundCounterElement.textContent = `Round ${currentRound} YOU WIN!`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }

        if (computerSelection === 2) {
            currentRound++;
            roundCounterElement.style.color = "darkslategray";
            roundCounterElement.textContent = `Round ${currentRound} DRAW`;
            scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;
        }
    }

    if (playerPoints > 1){
        isGameAlive = false;
        resultElement.style.display = "block";
        messageElement.style.color = "green";
        messageElement.textContent = "YOU WON THE GAME!"
    }

    if (computerPoints > 1){
        isGameAlive = false;
        resultElement.style.display = "block";
        messageElement.style.color = "darkred";
        messageElement.textContent = "YOU LOSE THE GAME!"
    }
};

const choosedRock = () => {
    if (isGameAlive) {
        playerChoise = 0;
        computerChoise = getComputerChoise();
        console.log(computerChoise);
        playerChoiseElement.setAttribute("src", imagePathRockPaperScissors[playerChoise]);
        computerChoiceElement.setAttribute("src", imagePathRockPaperScissors[computerChoise]);
        evaluateRound(playerChoise, computerChoise);
    }
};
    

const choosedPaper = () => {
    if (isGameAlive) {
        playerChoise = 1;
        computerChoise = getComputerChoise();
        playerChoiseElement.setAttribute("src", imagePathRockPaperScissors[playerChoise]);
        computerChoiceElement.setAttribute("src", imagePathRockPaperScissors[computerChoise]);
        evaluateRound(playerChoise, computerChoise);
    }
    
};

const choosedScissors = () => {
    if (isGameAlive) {
        playerChoise = 2;
        computerChoise = getComputerChoise();
        playerChoiseElement.setAttribute("src", imagePathRockPaperScissors[playerChoise]);
        computerChoiceElement.setAttribute("src", imagePathRockPaperScissors[computerChoise]);
        evaluateRound(playerChoise, computerChoise);
    }
   
};

const restartGame = () => {
    isGameAlive = true;
    playerChoise = 0;
    computerChoise = 0;
    playerPoints = 0;
    computerPoints = 0;
    currentRound = 0;
    resultElement.style.display = "none";
    compareElement.style.display = "none";
    roundCounterElement.textContent = "";
    scoreCounterElement.textContent = "";
};

// === Event-Bindings ===
rockImageElement.addEventListener('click', choosedRock);
paperImageElement.addEventListener('click', choosedPaper);
scissorsImageElement.addEventListener('click', choosedScissors);
btnNEwRound.addEventListener('click', restartGame);