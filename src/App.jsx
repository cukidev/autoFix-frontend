import './App.css'
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/navbar"
import RepairAdd from "./components/RepairAdd.jsx"
import RepairList from './components/RepairList.jsx';
import VehicleEdit from './components/VehicleEdit.jsx';
import VehicleAdd from './components/VehicleAdd.jsx';
import VehicleList from './components/VehicleList.jsx';
import RepairEdit from './components/RepairEdit.jsx';


function App() {
  return (
    <ThemeProvider>
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/repair/list" element={<RepairList/>} />
                <Route path="/repair/add" element={<RepairAdd/>} />
                <Route path="/repair/edit/:id" element={<RepairEdit/>} />
                <Route path="/vehicle/list" element={<VehicleList/>} />
                <Route path="/vehicle/add" element={<VehicleAdd/>} />
                <Route path="/vehicle/edit/:id" element={<VehicleEdit/>} />
              </Routes>
            </div>
        </Router>
    </ThemeProvider>
  );
}

export default App
