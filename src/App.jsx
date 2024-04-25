import './App.css'
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/navbar"
import RegistroReparacion from "./components/RegistroReparacion"
import RegistroVehiculo from './components/RegistroVehiculo';
import ListVehicle from './components/ListVehicle.jsx';
import ListRepair from './components/ListRepair.jsx';

function App() {
  return (
    <ThemeProvider>
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/register/list" element={<ListRepair/>} />
                <Route path="/vehicle/add" element={<RegistroVehiculo/>} />
                <Route path="/vehicle/list" element={<ListVehicle/>} />
              </Routes>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App
