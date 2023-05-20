import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home/index';
import History from './routes/history/index';
import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
