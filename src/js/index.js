'usestrict';

// === DOM-Elemente abrufen ===
const rockImageElement = document.getElementById("rock-image-element");
const paperImageElement = document.getElementById("paper-image-element");
const scissorsImageElement = document.getElementById("scissors-image-element");
const roundCounterElement = document.getElementById("round-counter-element");
const playerChoiceElement = document.getElementById("player-choice-element");
const computerChoiceElement = document.getElementById("computer-choice-element");
const scoreCounterElement = document.getElementById("score-counter-element");
const compareElement = document.getElementById("compare-element");
const resultElement = document.getElementById("result-element");
const messageElement = document.getElementById("message-element");
const btnNEwRound = document.getElementById("btn-new-round");

// === Spielvariablen initialisieren ===
const imagePaths = ["src/img/rock.jpg", "src/img/paper.jpg", "src/img/scissors.jpg"];
let playerChoice = 0;
let computerChoice = 0;
let playerPoints = 0;
let computerPoints = 0;
let currentRound = 0;
let isGameAlive = true;

// === Hilfsfunktion: Generierung der Computerauswahl ===
const getComputerChoice = () => {
    return Math.floor(Math.random() * 3);
};

/**
 * Bewertet die Runde basierend auf der Spieler- und Computerauswahl,
 * aktualisiert die Punktestände und zeigt das Rundenergebnis an.
 * 
 * @param {number} playerSelection - Die vom Spieler getroffene Auswahl (0: Rock, 1: Paper, 2: Scissors)
 * @param {number} computerSelection - Die vom Computer generierte Auswahl
 */
const roundEvaluated = (playerSelection, computerSelection) => {
    // Vergleichsbereich einblenden
    compareElement.style.display = "flex";

    // Runde hoczählen
    currentRound++;

    // Variablen für Nachricht und Textfarbe initialisieren
    let roundMessage = "";
    let textColor = "darkslategray"; // Standardfarbe bei Unentschieden

    // Spielregeln zur Bestmmung des Ergebnisses
    if (playerSelection === computerSelection) {
        roundMessage = `Round ${currentRound} DRAW!`;
    } else if (
        (playerSelection === 0 && computerSelection === 2) ||
        (playerSelection === 1 && computerSelection === 0) ||
        (playerSelection === 2 && computerSelection === 1)
    ) {
        // Spieler gewinnt
        playerPoints++;
        roundMessage = `Round ${currentRound} YOU WON!`;
        textColor = 'green';
    } else {
        // Computer gewinnt
        computerPoints++;
        roundMessage = `Round ${currentRound} YOU LOSE!`;
        textColor = "darkred";
    }

    // Anzeige der Rundenzahl und des Ergebnisses aktualisieren
    roundCounterElement.style.color = textColor;
    roundCounterElement.textContent = roundMessage;

    // Punktestand anzeigen
    scoreCounterElement.textContent = `You: ${playerPoints} Computer: ${computerPoints}`;

    // Überprüfen, ob das Spiel beendet werden soll (bei Erreichen von 2 Punkten)
    if (playerPoints > 1 || computerPoints > 1) {
        isGameAlive = false;
        resultElement.style.display= 'block';
        if (playerPoints > computerPoints) {
            messageElement.style.color = 'green';
            messageElement.textContent = "YOU WON THE GAME!";
        } else {
            messageElement.style.color = 'darkred';
            messageElement.textContent = "YOU LOSE THE GAME!"; 
        }
    }
};

/**
 * Behandelt die Spielerwahl, aktualisiert die Anzeige der Bilder
 * und wertet die Runde aus
 * 
 * @param {number} selection - Die Auswahl des Spielers (0: Rock, 1: Paper, 2: Scissors)
 */
const playerSelectionMade = (selection) => {
    if (!isGameAlive) return; // Keine weitere Auswahl, falls das Spiel beendet ist

    // Spielerwahl setzen
    playerChoice = selection;
    // Computerauswahl generieren
    computerChoice = getComputerChoice();

    // Anzeigen der entsprechenden Bilder für Spieler und Computer
    playerChoiceElement.setAttribute('src', imagePaths[playerChoice]);
    computerChoiceElement.setAttribute('src', imagePaths[computerChoice]);

    // Runde auswerten
    roundEvaluated(playerChoice, computerChoice);
};

/**
 * Setzt das Spiel zurück und bereitet eine neue Runde vor.
 */
const gameRestarted = () => {
    isGameAlive = true;
    playerChoice = 0;
    computerChoice = 0;
    playerPoints = 0;
    computerPoints = 0;
    currentRound = 0;
    resultElement.style.display = 'none';
    compareElement.style.display = 'none';
    roundCounterElement.textContent = "";
    scoreCounterElement.textContent = "";
};

// === Event-Bindings für die Spieleroptionen ===
rockImageElement.addEventListener('click', () => {
    // Spieler wählte Stein
    playerSelectionMade(0);
});
paperImageElement.addEventListener('click', () => {
    // Spieler wählte Papier
    playerSelectionMade(1);
});
scissorsImageElement.addEventListener('click', () => {
    // Spieler wählte Schere
    playerSelectionMade(2);
});
btnNEwRound.addEventListener('click', gameRestarted);