/*Set Variables*/
let expression = "";
let firstNumber = true;
let operator = null;
let result = null;
let lastResult = null;
let evaluationComplete = false;

/*Constant variables, current display, calculator buttons, and last display*/
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calculator-button");
const lastResultDisplay = document.getElementById("last-result-display");

/*Button's event listeners*/
buttons.forEach(button => {
    button.addEventListener("click", event => {
        const value = event.target.textContent;

        /*Checks when the first number is entered so operation can be inputted*/
        if (value === "+" || value === "-" || value === "*" || value == "/") {
            if (firstNumber) return;
        /*Display is updated once operator is clicked*/
            operator = value;
            expression += ' ${value} ';
            display.textContent = expression;
        } else if (value === "=") {
            if (!operator) return;
        /*Calculation is displayed in real-time*/
            result = eval(expression);
            display.textContent = `${expression} = ${result}`;
            evaluationComplete = true;
        /*Clear button*/
        } else if (value === "C") {
            expression = "";
            result = null;
            operator = null;
            firstNumber = true;
            evaluationComplete = false;
            display.textContent = "";
            buttons.forEach(button => {
                button.disabled = false;
            });
        } else {
            if (firstNumber || evaluationComplete) {
                expression = value;
                firstNumber = false;
                evaluationComplete = false;
                display.textContent = value;
            } else {
                expression += value;
                display.textContent = expression;
            }
        }
        /*Once calculation is complete, buttons are disabled*/
        if (evaluationComplete) {
            buttons.forEach(button => {
                button.disabled = true;
            });
            lastResult = result;
            lastResultDisplay.textContent = '${expression} = ${result}';
            
        /*The last result is stored in the local storage*/
            localStorage.setItem("lastResult", JSON.stringify(lastResult));
        }
   });
});
