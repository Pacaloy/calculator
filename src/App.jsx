import { useState } from 'react';
import { Calc } from 'calc-js';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [expression, setExpression] = useState(['']);

  const numClick = (e) => {
    const expressionArr = expression;

    expressionArr[expressionArr.length - 1] = expressionArr[expressionArr.length - 1] + '' + e.target.innerText;

    setInput(expressionArr.join(' '));
    setExpression(expressionArr);
    setOutput(calcExpression(expressionArr.slice()));
  };

  const operatorClick = (e) => {
    const expressionArr = expression;

    if (expressionArr[0] === '') return;

    // If expression ends with an operator
    if (expressionArr[expressionArr.length - 1] === '') {
      // Change last operator
      expressionArr[expressionArr.length - 2] = e.target.innerText;
    } else {
      expressionArr.push(e.target.innerText);
      expression.push('');
    }

    setInput(expressionArr.join(' '));
    setExpression(expressionArr);
  };

// TODO

console.log(expression);

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

console.log(calculate('x', 3, 4));

function calcExpression(arr) {
  const expressionArr = arr;

  // Remove excess from expression
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
      console.log(expressionArr);
      expressionArr.splice(operatorIndex - 1, 3, calculate(expressionArr[operatorIndex], expressionArr[operatorIndex - 1], expressionArr[operatorIndex + 1]));
    // Calculate all Addition and Subtraction after
    } else {
      // Get operator index for Addition and Subtraction
      let operatorIndex = expressionArr.findIndex(expressionElement => AS.some(operator => operator === expressionElement));
      console.log(expressionArr);
      expressionArr.splice(operatorIndex - 1, 3, calculate(expressionArr[operatorIndex], expressionArr[operatorIndex - 1], expressionArr[operatorIndex + 1]));
    }
  }

  return String(expressionArr[0]);
};

const expressionA = ['1', '+', '2', '-', '3', 'x', '4', '/', '5'];
const expressionB = ['1', '+', '2', '-', '3', 'x', '4', '/', '5', '%', ''];

console.log(calcExpression(expressionA));
console.log(calcExpression(expressionB));

// TODO

  return (
    <>
      <h3>{input}</h3>
      <h2>{output}</h2>
      <div className='button-container'>
        <button id='button1'>AC</button>
        <button id='button2'>+/-</button>
        <button id='button3' onClick={e => operatorClick(e)}>%</button>
        <button id='button4' onClick={e => operatorClick(e)}>/</button>
        <button id='button5' onClick={e => numClick(e)}>7</button>
        <button id='button6' onClick={e => numClick(e)}>8</button>
        <button id='button7' onClick={e => numClick(e)}>9</button>
        <button id='button8' onClick={e => operatorClick(e)}>x</button>
        <button id='button9' onClick={e => numClick(e)}>4</button>
        <button id='button10' onClick={e => numClick(e)}>5</button>
        <button id='button11' onClick={e => numClick(e)}>6</button>
        <button id='button12' onClick={e => operatorClick(e)}>-</button>
        <button id='button13' onClick={e => numClick(e)}>1</button>
        <button id='button14' onClick={e => numClick(e)}>2</button>
        <button id='button15' onClick={e => numClick(e)}>3</button>
        <button id='button16' onClick={e => operatorClick(e)}>+</button>
        <button id='button17' onClick={e => numClick(e)}>0</button>
        <button id='button18' onClick={e => numClick(e)}>.</button>
        <button id='button19'>H</button>
        <button id='button20'>=</button>
      </div>
    </>
  );
};

export default App;
