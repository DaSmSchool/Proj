
const outputs = [0, 0, 0]

function init() {

}

function updateOutput() {
    for (let i=0; i < outputs.length; i++) {
        $("output" + i).text(outputs[i])
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