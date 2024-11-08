const outputs = [0, 0, 0]
const correctCombo = []

function init() {
    generateCombo()
}

function generateCombo() {
    for (let i = 0; i < 3; i++) {
        numPick = Math.floor(Math.random() * 3) + 1
        correctCombo.push(numPick)
    }
}

function updateOutput() {
    for (let i=0; i < outputs.length; i++) {
        let printStr = outputs[i]
        if (printStr == 0) printStr = "_"
        $("#output" + (i+1)).text(printStr)
    }
}

function addNum(num) {
    if (outputs[outputs.length-1]) return
    
    for (let i=0; i < outputs.length; i++) {
        if (outputs[i] == 0) {
            outputs[i] = num
            updateOutput()
            break
        }
    }
}

function inpClicked(inpInd) {
    addNum(inpInd)
}

init()