import { Calc } from "calc-js";

const URL = 'http://localhost:5000'; // TODO fix URL

export function apiFetch(endpoint, method, body) {
  if (method !== 'GET') {
    return fetch(URL + endpoint, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then(res => res.json()).catch(err => console.error(err.message));
  } else {
    return fetch(URL + endpoint).then(res => res.json()).catch(err => console.error(err.message));
  }
};

// Arithemetic operations
function calculate(operation, numStringA, numStringB) {
  let numA = Number(numStringA);
  let numB = Number(numStringB);
  let result = 0;

  switch (operation) {
    case '+':
      result = new Calc(numA).sum(numB).finish();
      break;
    case '-':
      result = new Calc(numA).minus(numB).finish();
      break;
    case 'x':
      result = new Calc(numA).multiply(numB).finish();
      break;
    case '/':
      result = new Calc(numA).divide(numB).finish();
      break;
    case '%':
      result = numA % numB;
      break;
  }

  return String(result);
};

export function calcExpression(arr) {
  const expressionArr = arr;

  // Remove excess from expression array
  if (expressionArr[expressionArr.length - 1] === '') {
    for (let i = 0; i < 2; i++) {
      expressionArr.pop();
    }
  }

  // MD from MDAS order of operation
  const MD = ['x', '/', '%'];
  // AS from MDAS order of operation
  const AS = ['+', '-'];

  while (expressionArr.length > 1) {
    // Calculate all Modulo, Multiplication, and Division first
    if (MD.some(operator => expressionArr.includes(operator))) {
      // Get operator index for Modulo, Multiplication, and Division
      let operatorIndex = expressionArr.findIndex(expressionElement => MD.some(operator => operator === expressionElement));

      // Calculate the value between the operator and replace expression
      expressionArr.splice(operatorIndex - 1, 3, calculate(expressionArr[operatorIndex], expressionArr[operatorIndex - 1], expressionArr[operatorIndex + 1]));
    // Calculate all Addition and Subtraction after
    } else {
      // Get operator index for Addition and Subtraction
      let operatorIndex = expressionArr.findIndex(expressionElement => AS.some(operator => operator === expressionElement));

      // Calculate the value between the operator and replace expression
      expressionArr.splice(operatorIndex - 1, 3, calculate(expressionArr[operatorIndex], expressionArr[operatorIndex - 1], expressionArr[operatorIndex + 1]));
    }
  }

  return String(expressionArr[0]);
};
