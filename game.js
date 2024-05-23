document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("guess-button").addEventListener("click", makeGuess);

let word = "";
let falseOut = "";
let status = "HollyWoodGame";
let check = [];
let fCheck = 0;
let tCheck = 0;

function startGame() {
    word = document.getElementById("word-input").value.toLowerCase();
    falseOut = "";
    status = "HollyWoodGame";
    check = Array(word.length).fill("_");
    fCheck = 0;
    tCheck = 0;

    document.getElementById("player1-section").classList.add("hidden");
    document.getElementById("player2-section").classList.remove("hidden");

    updateDisplay();
}

function makeGuess() {
    const choice = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = "";

    if (choice && !processGuess(choice)) {
        alert("You have already chosen it, please try another one!");
    }

    if (fCheck >= 13 || tCheck === word.length) {
        endGame();
    } else {
        updateDisplay();
    }
}

function processGuess(choice) {
    let correct = isCorrectGuess(choice);
    let alreadyGuessed = isAlreadyGuessed(choice);

    if (correct && !alreadyGuessed) {
        for (let i = 0; i < word.length; ++i) {
            if (word[i] === choice) {
                check[i] = word[i];
                tCheck++;
            }
        }
        return true;
    } else if (!correct && !alreadyGuessed) {
        fCheck++;
        falseOut += choice;
        status = status.substring(0, fCheck - 1) + "*" + status.substring(fCheck);
        return true;
    }

    return false;
}

function isCorrectGuess(choice) {
    return word.includes(choice);
}

function isAlreadyGuessed(choice) {
    return check.includes(choice) || falseOut.includes(choice);
}

function updateDisplay() {
    document.getElementById("false-out").textContent = `Mistakes: ${falseOut}`;
    document.getElementById("status").textContent = `Status: ${status}`;
    document.getElementById("check").textContent = check.join(" ");
    if (fCheck === 10) {
        document.getElementById("chances").textContent = "Three chances left!";
    } else if (fCheck === 12) {
        document.getElementById("chances").textContent = "You have the last chance!";
    } else {
        document.getElementById("chances").textContent = "";
    }
}

function endGame() {
    let message = (fCheck >= 13) ? `The word was ${word}. \nPlayer 1 wins!` : `The word is ${word}, \nPlayer 2 wins!`;
    alert(message);

    document.getElementById("player1-section").classList.remove("hidden");
    document.getElementById("player2-section").classList.add("hidden");
}
