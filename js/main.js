inputs = [0, 0, 0]
correctCombo = []
var timeRemaining = 7

function init() {
    initGame()
}

function initGame() {
    timeRemaining = 7
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

function inputStr(truncated) {
    let assemble = ""

    for (let i = 0; i < inputs.length; i++) {
        assemble += inputs[i]
    }

    return assemble
}

function addNum(num) {
    if (inputs[inputs.length-1]) return
    
    for (let i=0; i < inputs.length; i++) {
        if (inputs[i] == 0) {
            inputs[i] = num
            updateOutput()
            break
        }
    }
}

function correctGuess() {
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
    $("#display-console-text").text("> You lost! The police got you!")
}

function makeGuess() {
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