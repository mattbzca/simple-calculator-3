class Calculator {
    constructor(lastResultDisplay,currentResultDisplay) {
        this.lastResultDisplay = lastResultDisplay
        this.currentResultDisplay = currentResultDisplay
        this.clear()
    }
    /*Clears all the numbers*/
    clear() {
        this.currentResult = ''
        this.lastResult = ''
        this.operation = undefined
    }
    /*Display number once its button is clicked*/
    displayNumber(number) {
        this.currentResult = number
    }
    /*Displays operation once its button is clicked*/
    displayOperation(operation) {
        
    }
    /*Calculates numbers*/
    compute() {

    }
    /*Updates the display on the results*/
    updateDisplay() {
        this.currentResultDisplay.innerText = this.currentResult
    }
}
/*Constant variables for the buttons*/
const numberButtons = document.querySelectorAll("#button-1, #button-2, #button-3, #button-4, #button-5, #button-6, #button-7, #button-8, #button-9, #button-0")
const operationButtons = document.querySelectorAll("#button-plus, #button-minus, #button-multiply, #button-divide")
const equalsButton = document.querySelector("#button-equals")
const clearButton = document.querySelector("#button-clear")
const lastResultDisplay = document.querySelector("#last-result-display")
const currentResultDisplay = document.querySelector("#display")

/*Object is made so that variables work*/
const calculator = new Calculator(lastResultDisplay, currentResultDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.displayNumber(button.innerText)
        calculator.updateDisplay()
    })
})