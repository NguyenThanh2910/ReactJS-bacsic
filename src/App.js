import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './calculator.js/Calculator';
import Navbar from './home/Navbar';
import Home from './home/Home';
import Weather from './weather/Weather';

function App() {
  return (
<BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Calculator />} />
      <Route path="/contact" element={<Weather/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
