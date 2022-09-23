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
  if (b === 0) return 0;
  return a / b;
}

function operate(a, b, operator) {
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', processInput));

const firstDisplayLine = document.querySelector('#display1');
const secondDisplayLine = document.querySelector('#display2');

let operands = [undefined,undefined, undefined];

function processInput(e) {
  const input = e.target.textContent;
 
  if (input.match(/[0-9]/)) {
    if (operands[0] === undefined)
      operands[0] = Number(input);
    else
      operands[1] = Number(input);
  }

  if (input.match(/[-+--*/]/)) {
    operands[2] = input;
  }

  if (input === '=') {
    const result = operate(Number(operands[0]), Number(operands[1]), operands[2]);
    secondDisplayLine.textContent = result;
    operands = [undefined, undefined, undefined];
  }

  console.log(operands);
  firstDisplayLine.textContent = e.target.textContent;
}