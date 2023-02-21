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
  if (b === 0) return "Oops, divide by 0 error!";
  return a / b;
}

function operate(a, b, operator) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const numButtons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equalOperator = document.querySelector('#equal-operator');

let num1;
let num2;
let operator;
let waitingFor2ndNum;

// buttons.forEach(button => button.addEventListener('click', processInput));
numButtons.forEach(button => {
  button.addEventListener('click', displayNum);
  button.addEventListener('click', storeNum);
})
operators.forEach(operator => {
  operator.addEventListener('click', getOperator);
})
equalOperator.addEventListener('click', operateAndDisplay);

function operateAndDisplay() {
  const result = operate(num1, num2, operator);
  display.textContent = result;
}


function getOperator(event) {
  operator = event.target.textContent;
  console.log(operator, typeof operator);
}

function displayNum(event) {
  const num = event.target.textContent;
  display.textContent = num;
}

function storeNum(event) {
  if(waitingFor2ndNum) {
    num2 = Number(event.target.textContent);
    waitingFor2ndNum = false;
  }
  else {
    num1 = Number(event.target.textContent);
    waitingFor2ndNum = true;
  }
  console.log(num1, typeof num1, num2, typeof num2, waitingFor2ndNum);
}

const clearButton = document.querySelector('.clear');
// clearButton.addEventListener('click', clear);

let operands = [undefined, undefined, undefined, false, -1];

function clear(e) {
  operands = [undefined, undefined, undefined, false];
  firstDisplayLine.textContent = '';
  secondDisplayLine.textContent = '';
}

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