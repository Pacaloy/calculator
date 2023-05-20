import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import History from './routes/history/History';
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
