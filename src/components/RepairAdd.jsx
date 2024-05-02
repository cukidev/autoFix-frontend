import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import repairService from "../services/repair.service";
import vehicleService from "../services/vehicle.service";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const RepairAdd = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState("");
    const [repairType, setRepairType] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [cost, setCost] = useState("");

    const repairTypes = ['Sistema de Frenos', 'Sistema de Refrigeración', 'Motor', 'Transmisión', 'Sistema Eléctrico', 'Sistema de Escape', 'Neumático y Ruedas', 'Suspensión y Dirección', 'Aire Acondicionado y Calefacción', 'Sistema de Combustible', 'Reparación y Reemplazo del Parabrisas y Cristales'];

    useEffect(() => {
        vehicleService.getAll().then(response => {
            setVehicles(response.data);
            if (response.data.length > 0) {
                setSelectedVehicleId(response.data[0].id);
            }
        }).catch(error => {
            console.error("Error loading vehicles", error);
            toast.error("Error loading vehicles");
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRepair = {
            vehicleId: selectedVehicleId,
            repairType,
            entryDate,
            pickupDate,
            cost,
            status
        };
        try {
            await repairService.create(newRepair);
            toast.success("Repair added successfully!");
            navigate('/repair/list');
        } catch (error) {
            console.error("Error adding repair", error);
            toast.error("Error adding repair");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <ToastContainer autoClose={2000} hideProgressBar />
            <h1>Añadir una reparación</h1>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="vehicle-label">Vehículo</InputLabel>
                <Select
                    labelId="vehicle-label"
                    value={selectedVehicleId}
                    onChange={e => setSelectedVehicleId(e.target.value)}
                    required
                >
                    {vehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Entry Date"
                type="date"
                value={entryDate}
                onChange={e => setEntryDate(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Pickup Date"
                type="date"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="repair-type-label">Tipo de reparación</InputLabel>
                <Select
                    labelId="repair-type-label"
                    value={repairType}
                    onChange={e => setRepairType(e.target.value)}
                    required
                >
                    <MenuItem value="">
                        <em>Selecciona un tipo de reparación</em>
                    </MenuItem>
                    {repairTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Costo"
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    required
                >
                    <MenuItem value="Pending">Pendiente</MenuItem>
                    <MenuItem value="In Progress">En progreso</MenuItem>
                    <MenuItem value="Completed">Completado</MenuItem>
                    <MenuItem value="Cancelled">Cancelado</MenuItem>
                </Select>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ mt: 1, mb: 2 }}
            >
                Añadir Reparación
            </Button>
        </Box>
    );
};

export default RepairAdd;
