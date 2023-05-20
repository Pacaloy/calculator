import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, calcExpression, checkDivideByZero } from '../../helpers';
import Icon from '@mdi/react';
import { mdiClose, mdiDivision, mdiEqual, mdiHistory, mdiMinus, mdiPercentOutline, mdiPlus, mdiPlusMinusVariant } from '@mdi/js';

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [expression, setExpression] = useState(['']);
  const [isNumNegative, setIsNumNegative] = useState(false);

  // Function everytime user clicks a number or decimal point
  const numClick = (e) => {
    const digit = e.target.innerText;
    const expressionArr = expression;

    // Restrict inputting leading zeroes
    if ((expressionArr[expressionArr.length - 1] === '0' || expressionArr[expressionArr.length - 1] === '-0') && digit === '0') return;

    // Restring multiple decimal point
    if (expressionArr[expressionArr.length - 1].includes('.') && digit === '.') return;

    // Appends a number in the input
    expressionArr[expressionArr.length - 1] = expressionArr[expressionArr.length - 1] + '' + digit;

    if (output) {
      setInput(digit);
      setOutput('');
      setExpression([digit]);
    } else {
      setInput(expressionArr.join(' '));
      setExpression(expressionArr);
    }
  };

  // Function everytime user clicks an operator
  const operatorClick = (operator) => {
    const expressionArr = expression;

    if (expressionArr[0] === '') return;

    // If expression ends with an operator
    if (expressionArr[expressionArr.length - 1] === '' || expressionArr[expressionArr.length - 1] === '-' ) {
      // Change last operator
      expressionArr[expressionArr.length - 2] = operator;
    } else {
      expressionArr.push(operator);
      expression.push('');
    }

    setInput(expressionArr.join(' '));
    setOutput('');
    setExpression(expressionArr);
    setIsNumNegative(false);
  };

  // Function everytime user clicks equal sign
  const equalsClick = () => {
    const expressionArr = expression;
    
    // Returns if input is invalid
    if (expressionArr.length === 1 || expressionArr[expressionArr.length - 1] === '' || expressionArr[expressionArr.length - 1] === '-' ) return;
    
    // Check if a number is divided by zero
    if (checkDivideByZero(expressionArr)) {
      setOutput('Invalid');
      setExpression(['']);
      console.log('Cannot divide by 0');
      return;
    }

    const answer = calcExpression(expressionArr.slice());

    setOutput(answer);
    setExpression([answer]);
    if (answer < 0) setIsNumNegative(true);

    // Create an entry to the user's history
    const calculation = `${input} = ${output}`;
    apiFetch(`/app/user/${userId}/transaction`, 'POST', { calculation })
    .then(() => {
      console.log('Entry added!');
    });
  };

  // Toggle number sign of current input
  const toggleSign = () => {
    const expressionArr = expression;
    const isNegative = !isNumNegative;
    console.log(isNegative) // TODO remove

    // Add or remove negative sign
    if (isNegative) {
      expressionArr[expressionArr.length - 1] = '-' + expressionArr[expressionArr.length - 1]
    } else {
      expressionArr[expressionArr.length - 1] = expressionArr[expressionArr.length - 1].substring(1);;
    }

    setInput(expressionArr.join(' '));
    setOutput('');
    setExpression(expressionArr);
    setIsNumNegative(isNegative);
  };

  // Clear all and reset
  const allClear = () => {
    setInput('');
    setOutput('');
    setExpression(['']);
    setIsNumNegative(false);
  };

  useEffect(() => {
    // Get os info
    const ua = navigator.userAgent;
    const os = ua.includes('iPhone') ? 'ios' : 'android';

    if (localStorage.getItem('uuid')) return;

    // Fetch unique id
    apiFetch('/app/user', 'POST', { os })
    .then(data => {
      const uuid = data.user.uuid;
      localStorage.setItem('uuid', uuid);
      setUserId(uuid);
    });
  }, []);
console.log(expression) // TODO delete
  return (
    <>
      <div className='input'>{input}</div>
      <div className='output'>{output}</div>
      <div className='button-container'>
        <button id='button1' onClick={() => allClear()}>AC</button>
        <button id='button2' onClick={() => toggleSign()}><Icon path={mdiPlusMinusVariant} size={1.5} /></button>
        <button id='button3' onClick={e => operatorClick('%')}><Icon path={mdiPercentOutline} size={1.5} /></button>
        <button id='button4' onClick={e => operatorClick('÷')}><Icon path={mdiDivision} size={1.5} /></button>
        <button id='button5' onClick={e => numClick(e)}>7</button>
        <button id='button6' onClick={e => numClick(e)}>8</button>
        <button id='button7' onClick={e => numClick(e)}>9</button>
        <button id='button8' onClick={e => operatorClick('×')}><Icon path={mdiClose} size={1.5} /></button>
        <button id='button9' onClick={e => numClick(e)}>4</button>
        <button id='button10' onClick={e => numClick(e)}>5</button>
        <button id='button11' onClick={e => numClick(e)}>6</button>
        <button id='button12' onClick={e => operatorClick('-')}><Icon path={mdiMinus} size={1.5} /></button>
        <button id='button13' onClick={e => numClick(e)}>1</button>
        <button id='button14' onClick={e => numClick(e)}>2</button>
        <button id='button15' onClick={e => numClick(e)}>3</button>
        <button id='button16' onClick={e => operatorClick('+')}><Icon path={mdiPlus} size={1.5} /></button>
        <button id='button17' onClick={e => numClick(e)}>.</button>
        <button id='button18' onClick={e => numClick(e)}>0</button>
        <button id='button19' onClick={() => navigate('/history')}><Icon path={mdiHistory} size={1.5} /></button>
        <button id='button20' onClick={() => equalsClick()}><Icon path={mdiEqual} size={1.5} /></button>
      </div>
    </>
  );
};

export default Home;
