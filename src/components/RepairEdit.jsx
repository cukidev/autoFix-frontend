import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RepairEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [repair, setRepair] = useState({
        repairType: '',
        entryDate: '',
        pickupDate: '',
        pickupTime: '',
        cost: '',
        status: ''
    });

    const repairTypes = ['Sistema de Frenos', 'Sistema de Refrigeración', 'Motor', 'Transmisión', 'Sistema Eléctrico', 'Sistema de Escape', 'Neumático y Ruedas', 'Suspensión y Dirección', 'Aire Acondicionado y Calefacción', 'Sistema de Combustible', 'Reparación y Reemplazo del Parabrisas y Cristales'];

    useEffect(() => {
        if (id) {
            repairService.get(id).then((response) => {
                const data = response.data;
                setRepair({
                    repairType: data.repairType,
                    entryDate: data.entryDate,
                    pickupDate: data.pickupDate,
                    pickupTime: data.pickupTime,
                    cost: data.cost,
                    status: data.status
                });
            }).catch((error) => {
                console.log("Error al obtener la reparación.", error);
                toast.error("Error al cargar los datos de la reparación.");
            });
        }
    }, [id]);

    const handleChange = (prop) => (event) => {
        setRepair({ ...repair, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        repairService.update(id, repair).then((response) => {
            console.log("Reparación actualizada.", response.data);
            toast.success("Reparación actualizada correctamente.");
            navigate("/repair/list");
        }).catch((error) => {
            console.log("Error al actualizar la reparación.", error);
            toast.error("Error al actualizar la reparación.");
        });
    };

    return (
        <Box>
            <ToastContainer />
            <h2>{"EDITAR REPARACIÓN"}</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        select
                        label="Tipo de Reparación"
                        value={repair.repairType}
                        onChange={handleChange('repairType')}
                        required
                    >
                        {repairTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Fecha de Entrada"
                        type="date"
                        value={repair.entryDate}
                        onChange={handleChange('entryDate')}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Fecha de Recogida"
                        type="date"
                        value={repair.pickupDate}
                        onChange={handleChange('pickupDate')}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Hora de Recogida"
                        type="time"
                        value={repair.pickupTime}
                        onChange={handleChange('pickupTime')}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        label="Costo"
                        type="number"
                        value={repair.cost}
                        onChange={handleChange('cost')}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                    <TextField
                        select
                        label="Estado"
                        value={repair.status}
                        onChange={handleChange('status')}
                        required
                    >
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="En Proceso">En Proceso</MenuItem>
                        <MenuItem value="Completado">Completado</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                    </TextField>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                    startIcon={<SaveIcon />}
                >
                    Guardar
                </Button>
            </form>
            <hr />
            <Link to="/repair/list">Volver</Link>
        </Box>
    );
};

export default RepairEdit;
