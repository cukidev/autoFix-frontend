import './App.css'
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/navbar"
import RegistroReparacion from "./components/RegistroReparacion.jsx"
import RegistroVehiculo from './components/VehiculoReparacion.jsx';
import ListVehicle from './components/ListVehicle.jsx';
import ListRepair from './components/ListRepair.jsx';
import EditVehicle from './components/EditVehicle.jsx';


function App() {
  return (
    <ThemeProvider>
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/repair/list" element={<ListRepair/>} />
                <Route path="/repair/add" element={<RegistroReparacion/>} />
                <Route path="/vehicle/list" element={<ListVehicle/>} />
                <Route path="/vehicle/add" element={<RegistroVehiculo/>} />
                <Route path="/vehicle/edit/:id" element={<EditVehicle/>} />
              </Routes>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App
