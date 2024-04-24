import './App.css'
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/navbar"
import RegistroReparacion from "./components/RegistroReparacion"

function App() {
  return (
    <ThemeProvider>
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/registroreparacion" element={<RegistroReparacion/>} />
              </Routes>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App
