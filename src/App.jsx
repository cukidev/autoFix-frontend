import './App.css'
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/navbar"
import RegistroReparacion from "./components/RegistroReparacion"
import RegistroVehiculo from './components/RegistroVehiculo';
import Sidemenu from './components/Sidemenu';
import listVehicle from './components/ListVehicle.jsx';

function App() {
  return (
    <ThemeProvider>
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/registroreparacion" element={<RegistroReparacion/>} />
                <Route path="/registrovehiculo" element={<RegistroVehiculo/>} />
                <Route path="/vehicle/list" element={<listVehicle/>} />
              </Routes>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App
