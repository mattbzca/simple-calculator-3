/*Set Variables*/
let expression = "";
let result = null;
let lastResult = null;
let operator = null;
let firstNumber = true;
let evaluationComplete = false;

/*Constant variables, current display, calculator buttons, and last display*/
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calculator-button");
const lastResultDisplay = document.getElementById("last-result-display");

/*Button's event listeners*/
buttons.forEach(button => {
  button.addEventListener("click", event => {
    /*Get the button value*/
    const value = event.target.textContent;

    /*Is the button an operator?*/
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      /*Has the first number been inputted?*/
      if (firstNumber) return;

      /*Operated is inputted, update display changes*/
      operator = value;
      expression += ` ${value} `;
      display.textContent = expression;
    } else if (value === "=") {
      /*Checks if the operator is there*/
      if (!operator) return;

      /*Calucate expression and update result*/
      result = eval(expression);
      display.textContent = `${expression} = ${result}`;
      evaluationComplete = true;
    } else if (value === "C") {
      /*Reset result*/
      expression = "";
      result = null;
      operator = null;
      firstNumber = true;
      evaluationComplete = false;
      display.textContent = "";

      /*Turns on the buttons*/
      buttons.forEach(button => {
        button.disabled = false;
      });
    } else {
      /*Check if the first number has been inputted and the calculation has been done*/
      if (firstNumber || evaluationComplete) {
        /*Reset calculator and update expression*/
        expression = value;
        firstNumber = false;
        evaluationComplete = false;
        display.textContent = value;
      } else {
        /*Ignore padding with zeros*/
        if (expression === "0" && value === "0") return;

        /*Updates expression*/
        expression += value;
        display.textContent = expression;
      }
    }

    /*Check if evaluation has been updated*/
    if (evaluationComplete) {
        /*Disable the buttons once updated*/
        buttons.forEach(button => {
          if (button.textContent !== "C") {
            button.disabled = true;
          }
        });
      
        /*Update the last result*/
        lastResult = result;
        lastResultDisplay.textContent = `${expression} = ${result}`;
      
        /* the lastResult is stored in the localStorage*/
        localStorage.setItem("lastResult", JSON.stringify(lastResult));
      }
  });
});

/*Grabs the lastResult from the localStorage*/
lastResult = JSON.parse(localStorage.getItem("lastResult"));
if (lastResult) {
  lastResultDisplay.textContent = lastResult;
}