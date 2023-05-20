function Entry(props) {
  const expression = props.calculation.split('=');

  return (
    <div className='entry-container'>
      <div>{expression[0]}</div>
      <div>={expression[1]}</div>
    </div>
  );
};

export default Entry;
