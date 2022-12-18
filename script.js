/*Set Variables*/
let expression = "";
let firstNumber = true;
let operator = null;
let result = null;
let lastResult = null;
let evaluationComplete = false;

/*Defining the calculator*/
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
        this.currentResult = this.currentResult.toString() + number.toString()
        this.updateDisplay()
    }
    /*Displays operation once its button is clicked*/
    displayOperation(operation) {
        if (this.currentResult === '') return
        if (this.lastResult !== '') {
            this.compute()
        }
        this.operation = operation
        this.lastResult = this.currentResult
        this.currentResult = ''
    }
    displayEqual(operation) {
        if (this.currentResult === '') return
        if (this.lastResult !== '') {
            this.compute()
        }
        this.operation = operation
        this.lastResult = this.currentResult
        this.currentResult = ''
    }
    /*Calculates numbers*/
    compute() {
        let computation
        const last = parseFloat(this.lastResult)
        const current = parseFloat(this.currentResult) 
        if (isNaN(last) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = last + current
                break
            case '-':
                computation = last - current
                break    
            case '*':
                computation = last * current
                break    
            case '/':
                computation = last / current
                break
    /*If sign in case does not exist */
            default:
                return       
        }
        this.currentResult = computation
        this.operation = undefined
        this.lastResult = ''
        this.updateDisplay()
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    /*Updates the display on the results in real time*/
    updateDisplay() {
        if (this.operation != null) {
            this.currentResultDisplay.innerText = 
             `${this.getDisplayNumber(this.lastResult)} ${this.operation}`
        } else {
            this.currentResultDisplay.innerText = 
             this.getDisplayNumber(this.currentResult)
        }
    }
}

/*Object is made so that variables work*/
const calculator = new Calculator(lastResultDisplay, currentResultDisplay)
/*When button is clicked, a number will display on the screen*/
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.displayNumber(button.innerText)
        calculator.updateDisplay()
    })
})
/*When button is clicked, an operator will be shown*/
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.displayOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})