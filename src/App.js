import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main';
import AboutUs from './components/AbouUs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about-us' element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
