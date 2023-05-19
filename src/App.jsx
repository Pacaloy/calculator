import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home/home';
import History from './routes/history/History';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
