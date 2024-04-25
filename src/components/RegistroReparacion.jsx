import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import repairService from "../services/repair.service";
import 'react-toastify/dist/ReactToastify.css';

const  RegistroReparacion= () => {
    const navigate = useNavigate();

    const [entryDate, setEntryDate] = useState(""); // fecha de ingreso
    const [repairType, setRepairType] = useState(""); // tipo de reparacion
    const [idVeh , setIdVeh] = useState(""); // id del vehiculo
    const [totalCost, setTotalCost] = useState(""); // costo total


    const repairTypes = ['Sistema de Frenos', 'Sistema de Refrigeración', 'Motor', 'Transmisión', 'Sistema Eléctrico', 'Sistema de Escape', 'Neumático y Ruedas', 'Suspensión y Dirección', 'Aire Acondicionado y Calefacción', 'Sistema de Combustible', 'Reparación y Reemplazo del Parabrisas y Cristales'];

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRepair = {
            repair_type: repairType,
            license_plate: license_plate
        };

        repairService.create(newRepair)
            .then(response => {
                console.log("Reparación registrada exitosamente", response);
                if (response.status === 201 || response.status === 200) {
                    toast.success("Reparación registrada exitosamente", {
                        position: "top-center",
                        onClose: () => navigate('/repair/list')
                    });
                } else {
                    console.error("Respuesta inesperada del servidor", response);
                    toast.error("Respuesta inesperada al registrar la reparación");
                }
            })
            .catch(error => {
                console.error("Error al registrar la reparación", error);
                toast.error("Error al registrar la reparación");
            });
        };

        const inputStyle = {
            padding: '12px 20px',
            margin: '8px 0',
            boxSizing: 'border-box',
            border: 'none',
            borderBottom: '2px solid #f2f2f2',
            transition: 'border-color 0.2s ease-in-out',
            outline: 'none',
            width: '100%',
            backgroundColor: '#f1f1f1',
            color: '#052b5c',
            borderRadius: '10px',
          };
    
        const buttonStyle = {
            backgroundColor: '#f53162',
            color: 'white',
            padding: '14px 20px',
            margin: '8px 0',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            opacity: '0.9',
          };

          return(
            <div>
                <ToastContainer autoClose={2000} hideProgressBar/>
                <h2>Registro de reparación</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        style={inputStyle}
                        type="date"
                        placeholder="Fecha de ingreso"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        required
                    />
                    <select
                        style={inputStyle}
                        value={repairType}
                        onChange={(e) => setRepairType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Seleccione un tipo de reparación</option>
                        {repairTypes.map((repairType, index) => (
                            <option key={index} value={repairType}>{repairType}</option>
                        ))}
                    </select>
                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="ID del vehículo"
                        value={idVeh}
                        onChange={(e) => setIdVeh(e.target.value)}
                        required
                    />
                    <button style={buttonStyle} type="submit">Registrar reparación</button>
                </form>

            </div>
          );
            
};
export default RegistroReparacion;
