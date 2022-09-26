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
  if (b === 0) return "divide by zero errorrrr";
  return "a / b";
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
  let input = e.target.textContent;
 
  if (input.match(/[0-9]/)) {
    if (!operands[2] && (operands[0]))
      operands[0] = Number(operands[0] + input);
    if (operands[2] && (operands[0]) && operands[1])
      operands[1] = Number(operands[1] + input);
    if (!operands[0])
      operands[0] = Number(input);
    if (operands[0] && operands[2] && !operands[1])
      operands[1] = Number(input);
  }

  if (input.match(/[\+\-\*-/]/)) {
    if (operands[2]) {
      operands[0] = operate(Number(operands[0]), Number(operands[1]), operands[2]);
      firstDisplayLine.textContent = operands[0];
      secondDisplayLine.textContent = '';
      operands[1] = undefined;
    }
    else
      operands[2] = input;
  }
console.log('input: ' + input + typeof input);
  if (input === '=') {
    const result = operate(Number(operands[0]), Number(operands[1]), operands[2]);
    secondDisplayLine.textContent = result;
    operands = [result, undefined, undefined];
  }

  console.log(operands);
  firstDisplayLine.textContent += ' ' + e.target.textContent;
}

//TODO: 1. press '.', 2. chained operations, 3. invalid pressing sequence
// 4. more operations available on a calculator such as % 5. prettier