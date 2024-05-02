import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import vehicleService from "../services/vehicle.service";
import 'react-toastify/dist/ReactToastify.css';

const  VehicleAdd= () => {
    const navigate = useNavigate();

    const [licensePlate, setLicensePlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [yearOfManufacture, setYearOfManufacture] = useState("");
    const [engineType, setEngineType] = useState("");
    const [seats, setSeats] = useState("");
    const [mileage, setMileage] = useState("");

    const vehicleTypes = ['Sedan', 'Hatchback', 'SUV', 'Pickup', 'Furgoneta'];
    const engineTypes = ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación para la patente
        const licensePlateRegex = /^[A-Za-z]{4}\d{2}$/;
        if (!licensePlateRegex.test(licensePlate)) {
            toast.error("La patente debe tener cuatro letras seguidas de dos números.");
            return;
        }

        // Validación para el año de fabricación
        const currentYear = new Date().getFullYear();
        if (yearOfManufacture < 1900 || yearOfManufacture > currentYear) {
            toast.error("El año de fabricación debe estar entre 1900 y el año actual.");
            return;
        }
        
        // Validación para el número de asientos
        if (seats < 1 || seats > 20) {
            toast.error("El número de asientos debe estar entre 1 y 20.");
            return;
        }

        if (!licensePlate || !brand || !model || !vehicleType || !yearOfManufacture || !engineType || !seats || !mileage) {
            toast.error("Por favor complete todos los campos.");
            return;
        }

        // Validación para el kilometraje tiene que ser un numero siosi
        if (isNaN(mileage)) {
            toast.error("El kilometraje debe ser un número.");
            return;
        }

        const newVehicle = {
            licensePlate: licensePlate.toUpperCase(),
            brand: brand.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            model: model.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            v_type: vehicleType,
            year_of_manufacture: yearOfManufacture,
            engine_type: engineType,
            seats,
            mileage
        };
    
        vehicleService.create(newVehicle)
        .then(response => {
            console.log("Respuesta completa del servidor:", response);
            if (response.status === 200 || response.status === 201) {
                toast.success("Vehículo registrado con éxito", {
                    position: "top-center",
                    onClose: () => navigate('/vehicle/list')
                });
            } else {
                console.error("Respuesta inesperada del servidor", response);
                toast.error("Respuesta inesperada al registrar el vehículo");
            }
        })
        .catch(error => {
            console.error("Ha ocurrido un error al registrar el vehículo", error);
            toast.error("Error al registrar el vehículo");
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
      
    return (
      <div>
        <ToastContainer autoClose={2000} hideProgressBar />
        <h1>Registra un nuevo vehículo</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} placeholder="Patente - Ejemplo: AABB44" style={inputStyle} />
            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Marca" style={inputStyle} />
            <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="Modelo" style={inputStyle} />
            <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} style={inputStyle}>
                <option value="">Seleccione Tipo de Vehículo</option>
                {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
            </select>
            <input type="text" value={yearOfManufacture} onChange={e => setYearOfManufacture(e.target.value)} placeholder="Año de fabricación" style={inputStyle} />
            <select value={engineType} onChange={e => setEngineType(e.target.value)} style={inputStyle}>
                <option value="">Seleccione Tipo de Motor</option>
                {engineTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
            </select>
            <input type="text" value={seats} onChange={e => setSeats(e.target.value)} placeholder="Número de asientos" style={inputStyle} />
            <input type="text" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="Kilometraje" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Registrar vehículo</button>
        </form>
      </div>
    );                 
};

export default VehicleAdd;
