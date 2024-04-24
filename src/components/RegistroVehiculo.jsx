import React, { useState } from "react";
import logoImage from "../assets/logo.png";

const RegistroVehiculo = () => {

    const [vin, setVin] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [yearOfManufacture, setYearOfManufacture] = useState("");
    const [engineType, setEngineType] = useState("");
    const [seats, setSeats] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            vin,
            licensePlate,
            brand,
            model,
            vehicleType,
            yearOfManufacture,
            engineType,
            seats,
        });

    const response = fetch('http://localhost:8090/api/v1/vehicle/', vehicleData)

};

    return (
      <div>
        <img src={logoImage} alt="Autofix Logo" style={{ width: '90px', height: 'auto' }} />
        <h1>Registro de Vehículo</h1>
        <p>Registra un vehículo en el sistema</p>
            <form onSubmit={handleSubmit}>
            <input type="text" value={vin} onChange={e => setVin(e.target.value)} placeholder="Vin del Vehículo" />
            <input type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} placeholder="Patente" />
            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Marca" />
            <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="Modelo" />
            <input type="text" value={vehicleType} onChange={e => setVehicleType(e.target.value)} placeholder="Tipo de Vehículo" />
            <input type="text" value={yearOfManufacture} onChange={e => setYearOfManufacture(e.target.value)} placeholder="Año de fabricación" />
            <input type="text" value={engineType} onChange={e => setEngineType(e.target.value)} placeholder="Tipo de motor" />
            <input type="text" value={seats} onChange={e => setSeats(e.target.value)} placeholder="Número de asientos" />
            <button type="submit">Registrar vehículo</button>
            </form>
        </div>
    );
}
export default RegistroVehiculo;