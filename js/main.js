inputs = [0, 0, 0]
correctCombo = []
var timeRemaining = 7
var wins = 0
var losses = 0
var playing = false

function init() {
    loadStored()
    initStats()
    initGame()
}

function loadStored() {
    if (localStorage.wins) {
        wins = parseInt(localStorage.wins)
    } else {
        localStorage.setItem("wins", 0)
    }

    if (localStorage.losses) {
        losses = parseInt(localStorage.losses)
    } else {
        localStorage.setItem("losses", 0)
    }
}

function initStats() {
    updateStats()
}

function initGame() {
    timeRemaining = 7
    playing = true
    inputs = [0, 0, 0]
    initConsole()
    generateCombo()
    updateOutput()
}

function initConsole() {
    $("#display-console-text").text("> Enter your combination. ")
    $("#display-console-guesses").text("> You have " + timeRemaining + " guess(es) remaining.")
}

function generateCombo() {
    correctCombo = []
    for (let i = 0; i < 3; i++) {
        numPick = Math.floor(Math.random() * 3) + 1
        correctCombo.push(numPick)
    }
}

function updateStats() {
    $("#game-wins").text("Wins: " + wins)
    $("#game-losses").text("Losses: " + losses)
}

function updateOutput() {
    for (let i=0; i < inputs.length; i++) {
        let printStr = inputs[i]
        if (printStr == 0) printStr = "_"
        $("#output" + (i+1)).text(printStr)
    }
}

function updateTime() {
    $("#time-remaining").text(timeRemaining)
}

function updateConsole() {
    $("#display-console-guesses").text("> You have " + timeRemaining + " guess(es) remaining.")
}

function addWin() {
    wins += 1
    localStorage.wins = wins
    updateStats()
}

function addLoss() {
    losses += 1
    localStorage.losses = losses
    updateStats()
}

function inputStr(truncated) {
    let assemble = ""

    for (let i = 0; i < inputs.length; i++) {
        assemble += inputs[i]
    }

    return assemble
}

function addNum(num) {
    if (inputs[inputs.length-1] | playing == false) return
    
    for (let i=0; i < inputs.length; i++) {
        if (inputs[i] == 0) {
            inputs[i] = num
            updateOutput()
            break
        }
    }
}

function correctGuess() {
    playing = false
    addWin()
    $("#display-console-text").text("> You broke in and won!")
    $("#display-console-guesses").text("> Wanna play again? press restart!")
}

function wrongGuess() {
    clearInput()
    timeRemaining -= 1
    updateTime()
    updateConsole()

    if (timeRemaining <= 0) gameLost()
}

function guessTooLow() {
    $("#display-console-text").text("> " + inputStr() + ": Guess too low!")
}

function guessTooHigh() {
    $("#display-console-text").text("> " + inputStr() + ": Guess too high!")
}

function indivWrongOutcome(correctNumber, guessedNumber) {
    if (correctNumber < guessedNumber) {
        guessTooHigh()
    } else if (correctNumber > guessedNumber) {
        guessTooLow()
    }
}

function gameLost() {
    addLoss()
    $("#display-console-text").text("> You lost! The police got you!")
    playing = false
}

function makeGuess() {
    if (playing == false) return
    let guessCorrect = true
    for (let i = 0; i < 3; i++) {
        if (inputs[i] != correctCombo[i]) {
            guessCorrect = false
            indivWrongOutcome(correctCombo[i], inputs[i])
            break
        }
    }

    if (guessCorrect) {
        correctGuess()
    } else {
        wrongGuess()
    }
}

function postInput() {
    if (inputs[inputs.length-1] != 0) {
        makeGuess()
    }
}

function clearInput() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i] = 0
    }
    updateOutput()
}

function inpClicked(inpInd) {
    addNum(inpInd)
    postInput()
}

function clearClicked() {
    clearInput()
}

function restartClicked() {
    initGame()
}

init()