import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import repairService from '../services/repair.service';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icono para añadir reparaciones

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    repairService.getAll()
      .then(response => {
        console.log("Repairs loaded:", response.data);
        setRepairs(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch repairs:", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro que quieres eliminar esta reparación?")) {
      repairService.remove(id)
        .then(() => {
          console.log("Repair deleted.");
          init(); // Refresh the list after delete
        })
        .catch(error => {
          console.error("Failed to delete repair:", error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/repair/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link to="/repair/add" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon/>}
        >
          Añadir Reparación
        </Button>
      </Link>
      <br /><br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID Reparación</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Patente</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de reparación</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha de Entrada</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha de Recogida</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora de Recogida</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell align="left">{repair.id}</TableCell>
              <TableCell align="left">{repair.vehicle ? repair.vehicle.licensePlate : 'N/A'}</TableCell>
              <TableCell align="left">{repair.repairPrice ? repair.repairPrice.type : 'N/A'}</TableCell>
              <TableCell align="left">{repair.entryDate}</TableCell>
              <TableCell align="left">{repair.pickupDate || 'N/A'}</TableCell>
              <TableCell align="left">{repair.pickupTime || 'N/A'}</TableCell>
              <TableCell align="left">${repair.repairCost ? repair.repairCost.toFixed(2) : 'N/A'}</TableCell>
              <TableCell align="left">{repair.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(repair.id)}
                  startIcon={<EditIcon />}
                  style={{ marginRight: '0.5rem' }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(repair.id)}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepairList;
