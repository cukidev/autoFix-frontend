import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VehicleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [licensePlate, setLicensePlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [yearOfManufacture, setYearOfManufacture] = useState("");
    const [engineType, setEngineType] = useState("");
    const [seats, setSeats] = useState("");
    const [mileage, setMileage] = useState("");
    const [titleVehicleForm, setTitleVehicleForm] = useState("EDITAR VEHÍCULO");

    const updateVehicle = (e) => {
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

        // Validación para el kilometraje tiene que ser un numero siosi y no puede sobrepasar los 6 digito
        if (isNaN(mileage) || mileage.length > 6) {
            toast.error("El kilometraje debe ser un número y no puede sobrepasar los 6 dígitos.");
            return;
        }

        const vehicle = {
            id,
            licensePlate: licensePlate,
            brand,
            model,
            v_type: vehicleType,
            year_of_manufacture: yearOfManufacture,
            engine_type: engineType,
            seats,
            mileage
        };

        if(id){
            // Actualizar datos empleado
            vehicleService
                .update(id, vehicle)
                .then((response) => {
                    console.log("Vehículo actualizado.", response.data);
                    navigate("/vehicle/list");
                    toast.success("Vehículo actualizado correctamente.");
                })
                .catch((error) => {
                    console.log("Se ha producido un error al intentar actualizar vehículo.", error);
                });
        } 
            else 
        {
            // Crear nuevo vehiculo
            vehicleService
                .create(vehicle)
                .then((response) => {
                    console.log("Vehículo creado.", response.data);
                    navigate("/vehicles");
                })
                .catch((error) => {
                    console.log("Se ha producido un error al intentar crear vehículo.", error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            vehicleService
                .get(id)
                .then((response) => {
                    const vehicle = response.data;
                    setLicensePlate(vehicle.licensePlate);
                    setBrand(vehicle.brand);
                    setModel(vehicle.model);
                    setVehicleType(vehicle.v_type);
                    setYearOfManufacture(vehicle.year_of_manufacture);
                    setEngineType(vehicle.engine_type);
                    setSeats(vehicle.seats);
                    setMileage(vehicle.mileage);
                })
                .catch((error) => {
                    console.log("Se ha producido un error.", error);
                });
        }else{
            setTitleVehicleForm("Nuevo Vehículo");
        }
    }, [id]);

    return (
        <Box>
            <ToastContainer />
            <h2>{titleVehicleForm}</h2>
            <hr />
            <form onSubmit={updateVehicle}>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Patente"
                        variant="outlined"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Marca"
                        variant="outlined"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Modelo"
                        variant="outlined"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Tipo de Vehículo"
                        variant="outlined"
                        select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                    >
                        <MenuItem value="Sedan">Sedan</MenuItem>
                        <MenuItem value="Hatchback">Hatchback</MenuItem>
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Pickup">Pickup</MenuItem>
                        <MenuItem value="Furgoneta">Furgoneta</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Año de Fabricación"
                        variant="outlined"
                        value={yearOfManufacture}
                        onChange={(e) => setYearOfManufacture(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Tipo de Motor"
                        variant="outlined"
                        select
                        value={engineType}
                        onChange={(e) => setEngineType(e.target.value)}
                        required
                    >
                        <MenuItem value="Gasolina">Gasolina</MenuItem>
                        <MenuItem value="Diésel">Diésel</MenuItem>
                        <MenuItem value="Híbrido">Híbrido</MenuItem>
                        <MenuItem value="Eléctrico">Eléctrico</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                    
                        label="Asientos"
                        variant="outlined"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth sx ={{marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Kilometraje"
                        variant="outlined"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        required
                    />
                </FormControl >
                <Button
                    type="submit"
                    onClick={(e) => updateVehicle(e)}
                    variant="contained"
                    color="info"
                    style = {{marginTop: "1rem"} }
                    startIcon={<SaveIcon />}
                >
                    Guardar
                </Button>
            </form>
            <hr />
            <Link to="/vehicle/list">Volver</Link>
        </Box>
    );
}

export default VehicleEdit;
