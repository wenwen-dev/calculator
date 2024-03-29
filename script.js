let display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const numButtons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equalOperator = document.querySelector('#equal-operator');
const clearBtn = document.querySelector("#clear-btn");
const decimalBtn = document.querySelector('#decimal');
const deleteBtn = document.querySelector('#delete-btn');

let num1;
let num2;
let operator;
let result;
let waitingFor2ndNum;
let isDecimal = false;

clearBtn.addEventListener('click', clear);
numButtons.forEach(button => {
  button.addEventListener('click', displayNum);
  button.addEventListener('click', storeNum);
})
operators.forEach(operator => {
  operator.addEventListener('click', getOperator);
})
deleteBtn.addEventListener('click', deleteOneDigit);
equalOperator.addEventListener('click', operateAndDisplay);

function deleteOneDigit(event) {
  let result = display.textContent;
  if (result) result = result.slice(0, result.length - 1);
  display.textContent = result;
  if (!num2) num1 = Number(result);
  else num2 = Number(result);
  console.log("after delete: ", num1, num2);
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
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === 'x') return multiply(a, b);
  if (operator === '÷') return divide(a, b);
}




//FIXME: at last, go through my codes, esp. storeNum() and improve the logic, can compare with other solutions to learn



function getDecimal() {
  if (num1 && !num2) {
    num1 = ''+num1+'.';
    isDecimal = true;
  }

}

function clear() {
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  result = undefined;
  waitingFor2ndNum = undefined;
  display.textContent = "";
  isDecimal = false;
  decimalBtn.disabled = false;
}

function operateAndDisplay(event) {
  console.log(`summary: ${num1}, ${num2}, ${operator}`);
  if (num2 === 0) {
    display.textContent = "Divide by 0? Seriously?";
  }
  else if (num1 && num2 && operator) {
    result = operate(num1, num2, operator);
    console.log(result);  
    if ((result+"").length > 10) result = Number(result).toFixed(9);
    num1 = result;
    num2 = undefined;
    operator = undefined;
    waitingFor2ndNum = undefined;
    isDecimal = false;
    decimalBtn.disabled = false;
    display.textContent = num1;
  }
  else {
    display.textContent = "Error";
    clear();
  } 
}

function getOperator(event) {
  decimalBtn.disabled = false;
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
  event.target.style.backgroundColor = 'white';
  event.target.style.color = 'black';

}

function displayNum(event) {
  const num = event.target.textContent;
  display.textContent = num;
}

function updateNum(num) {
  display.textContent = num;
}

function storeNum(event) {
  operators.forEach(operator =>  {
    operator.style.backgroundColor = '#635985';
    operator.style.color = 'white';

  })
  if (event.target.textContent == '.') {
    isDecimal = true;
    num2 ? 
        num2 = '' + num2 + event.target.textContent : 
        num1 = '' + num1 + event.target.textContent;
    display.textContent = num2 ? num2 : num1;
  }
  
  else if (isDecimal && !num2) {
    decimalBtn.disabled = false;
    num1 = Number('' + num1 + event.target.textContent);
    display.textContent = num1;
    decimalBtn.disabled = true;
    isDecimal = false;
  }

  else if (isDecimal && num1 && num2) {
    decimalBtn.disabled = false;
    num2 = Number('' + num2 + event.target.textContent);
    display.textContent = num2;
    decimalBtn.disabled = true;
    isDecimal = false;
  }

  else if (!isDecimal && !operator && num1) {
    num1 = Number(""+num1+event.target.textContent);
    updateNum(num1);
  }
  else if (!isDecimal && !operator && !num1) {
    num1 = Number(event.target.textContent);
  }
  else if (!isDecimal && waitingFor2ndNum) {
    num2 = Number(event.target.textContent);
    waitingFor2ndNum = false;
  }
  else if (num1 && num2 && operator) {
    num2 = Number(''+ num2 + event.target.textContent);
    display.textContent = num2;
  }

  console.log(num1, typeof num1, num2, typeof num2, operator,waitingFor2ndNum);
}