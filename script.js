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

function operate(operator, a, b) {
  if (operator === 'add') return add(a, b);
  if (operator === 'subtract') return subtract(a, b);
  if (operator === 'multiply') return multiply(a, b);
  if (operator === 'divide') return divide(a, b);
}