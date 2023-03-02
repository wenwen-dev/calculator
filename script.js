let display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const numButtons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equalsOperator = document.querySelector('#equals-operator');
const clearBtn = document.querySelector("#clear-btn");
const decimalBtn = document.querySelector('#decimal');
const deleteBtn = document.querySelector('#delete-btn');

let num1 = '';
let num2 = '';
let operator = null;
let shouldResetScreen = false;

clearBtn.addEventListener('click', clear);
numButtons.forEach(button => {
  button.addEventListener('click', concatNum);
})
operators.forEach(operator => {
  operator.addEventListener('click', getOperator);
})
deleteBtn.addEventListener('click', deleteOneDigit);
equalsOperator.addEventListener('click', evaluate);

//FIXME: next time, implement key event
document.addEventListener('keyup',  event => {
  event.preventDefault(); //??
  const key = event.key;
  console.log(event.key);
  if (key === 'Backspace') deleteOneDigit();
  else if (key === 'Escape') clear();
  else if (Array.from(numButtons).some(btn=>btn.textContent==key)) {
    displayNum(key);
    concatNum(key);
  }
  else if (Array.from(operators).some(btn=>btn.textContent==key)) {
    getOperator();
  }

})

function evaluate(event) {
  if (!operator) return;
  num2 = display.textContent;
  if (operator === '÷' && num2 === '0') {
    display.textContent = "Error - divide by 0";
    return;
  }
  let result = operate(num1, num2, operator);
  display.textContent = result;

  console.log(`
  display.textContent: ${display.textContent}, type: ${typeof display.textContent};
  num1: ${num1}, type: ${typeof num1}; 
  operator: ${operator};
  num2: ${num2}, type: ${typeof num2}; 
  result: ${result}`);
}

function getOperator(event) {
  if (operator && !num2) return; //invalid click
  if (operator && num2) num2 = '';
  shouldResetScreen = true;
  num1 = display.textContent;
  operator = event.target.textContent;

  event.target.style.backgroundColor = 'white';
  event.target.style.color = 'black';

  console.log(`
  display.textContent: ${display.textContent}, type: ${typeof display.textContent};
  num1: ${num1}, type: ${typeof num1}; 
  operator: ${operator};
  num2: ${num2}, type: ${typeof num2}; `);
}

function resetDisplay() {
  display.textContent = '';
}

function concatNum(event) {
  changeBtnStyle(operators);
  if (shouldResetScreen || display.textContent === '0') {
    resetDisplay();
    shouldResetScreen = false;
  }
  if (event.target.textContent === '.' && display.textContent.includes('.')) return;
  display.textContent += event.target.textContent;

  console.log(`
  display.textContent: ${display.textContent}, type: ${typeof display.textContent};
  num1: ${num1}, type: ${typeof num1}; 
  operator: ${operator};
  num2: ${num2}, type: ${typeof num2}; `);
}

function changeBtnStyle(buttons) {
  buttons.forEach(button =>  {
    button.style.backgroundColor = '#635985';
    button.style.color = 'white';
  })
}

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
  if (b != 0) return a / b;
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === 'x') return multiply(a, b);
  if (operator === '÷') return divide(a, b);
}

function deleteOneDigit(event) {
  let result = display.textContent;
  result = result.slice(0, result.length - 1);
  display.textContent = result;
}

function clear() {
  num1 = '';
  num2 = '';
  operator = null;
  shouldResetScreen = false;
  display.textContent = "0";
}