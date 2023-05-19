import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, calcExpression } from '../../helpers';

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [expression, setExpression] = useState(['']);

  // Function everytime user clicks a number or decimal point
  const numClick = (e) => {
    const expressionArr = expression;

    expressionArr[expressionArr.length - 1] = expressionArr[expressionArr.length - 1] + '' + e.target.innerText;

    setInput(expressionArr.join(' '));
    setExpression(expressionArr);
    setOutput(calcExpression(expressionArr.slice()));
  };

  // Function everytime user clicks an operator
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

  // Create an entry to the user's history
  const createEntry = () => {
    const calculation = `${input} = ${output}`;
    apiFetch(`/app/user/${userId}/transaction`, 'POST', { calculation })
    .then(() => {
      console.log('Entry added!');
    });
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
        <button id='button19' onClick={() => navigate('/history')}>H</button>
        <button id='button20' onClick={() => createEntry()}>=</button>
      </div>
    </>
  );
};

export default Home;
