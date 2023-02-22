function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return "Oops, divide by 0 error!";
  console.log(b);
  return a / b;
}

function operate(a, b, operator) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === 'x') return multiply(a, b);
  if (operator === '÷') return divide(a, b);
}

let display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const numButtons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equalOperator = document.querySelector('#equal-operator');
const clearBtn = document.querySelector("#clear-btn");

let num1;
let num2;
let operator;
let result;
let waitingFor2ndNum;

clearBtn.addEventListener('click', clear);

// buttons.forEach(button => button.addEventListener('click', processInput));
numButtons.forEach(button => {
  button.addEventListener('click', displayNum);
  button.addEventListener('click', storeNum);
})
operators.forEach(operator => {
  operator.addEventListener('click', getOperator);
})
equalOperator.addEventListener('click', operateAndDisplay);



function clear() {
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  waitingFor2ndNum = false;
  display.textContent = "";
}

function operateAndDisplay(event) {
  console.log(num2, typeof num2);
  console.log(display.textContent);
  if (num2 === 0) {
    display.textContent = "Divide by 0? Seriously?";
  }
  else if (num1 && num2 && operator) {
    result = operate(num1, num2, operator);
    console.log(result);  
    if ((result+"").length > 10) result = Number(result).toFixed(9);
    clear();
    display.textContent = result;

  }
  else {
    display.textContent = "Error";
    clear();
  } 
  
}

function getOperator(event) {
  console.log(`operator: ${event.target.textContent}`);

  if (num1 && num2) {
    waitingFor2ndNum = false;
    console.log("continuing operation", num1, num2);
    operateAndDisplay();
    console.log("continuing operation, cleared", num1, num2);

    num1 = result;
    operator = event.target.textContent;
    waitingFor2ndNum = true;
    console.log("continuing operation, cleared and reassigned num1", num1, num2);
  }
  else {
    waitingFor2ndNum = true;
    console.log("only num1 has value");
    operator = event.target.textContent;
  }
  console.log(`summary: ${num1}, ${num2}, ${operator}`);

}

function displayNum(event) {
  const num = event.target.textContent;
  display.textContent = num;
}
function updateNum(num) {
  display.textContent = num;
}

function storeNum(event) {
  if (!operator && num1) {
    num1 = Number(""+num1+event.target.textContent);
    updateNum(num1);
  }
  else if (!operator && !num1) {
    num1 = Number(event.target.textContent);
  }
  else if (waitingFor2ndNum) {
    num2 = Number(event.target.textContent);
    waitingFor2ndNum = false;
  }

  console.log(num1, typeof num1, num2, typeof num2, operator,waitingFor2ndNum);
}

//Below: old code
const clearButton = document.querySelector('.clear');
// clearButton.addEventListener('click', clear);

let operands = [undefined, undefined, undefined, false, -1];

// function clear(e) {
//   operands = [undefined, undefined, undefined, false];
//   firstDisplayLine.textContent = '';
//   secondDisplayLine.textContent = '';
// }

function processInput(e) {
  let input = e.target.textContent;

  if (operands[3] === false && input.match(/[0-9]/)) {
    if (operands[2] === undefined && (operands[0]))
      operands[0] = Number(operands[0] + input);
    if (operands[2] && (operands[0]) && operands[1])
      operands[1] = Number(operands[1] + input);
    if (operands[0] === undefined)
      operands[0] = Number(input);
    if (operands[0] && operands[2] && !operands[1])
      operands[1] = Number(input);
  }

  if (input == '.') {
    operands[3] = true;
  }

  if (input === '+' || input === '-' || input === '*' || input === '/') {
    if (operands[3] === true && !operands[1]) {
      console.log(operands[4]);
      console.log(operands[0]);
      operands[0] = Number(operands[0]) * Math.pow(10, -1 * operands[4]);
      operands[3] = false;
    }

  if (operands[2]) {
    operands[0] = operate(Number(operands[0]), Number(operands[1]), operands[2]);
    firstDisplayLine.textContent = operands[0];
    secondDisplayLine.textContent = '';
    operands[1] = undefined;
    operands[2] = input;
  }
    else
      operands[2] = input;
  }
  

  if (operands[2] && operands[0] == undefined && operands[1] == undefined) {
  secondDisplayLine.textContent = 'Please clear and select a number to get started'
}

  if (input === '=') {
    const result = operate(Number(operands[0]), Number(operands[1]), operands[2]);
    secondDisplayLine.textContent = result;
    operands = [result, undefined, undefined];
  }

  firstDisplayLine.textContent += ' ' + e.target.textContent;
}

//TODO: 1. allow decimal number input (e.g. 3.5)
// TODO: allow operations available on a calculator such as % 
//TODO: prettier: change color when hover
//TODO: use RegEx for condition operator sign