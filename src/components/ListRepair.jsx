import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListRepair = () => {
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    vehicleService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los vehículos.", response.data);
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los vehículos.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehículo?"
    );
    if (confirmDelete) {
      vehicleService
        .remove(id)
        .then((response) => {
          console.log("El vehículo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el vehículo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/vehicle/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/vehicle/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir Vehículo
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Marca
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Modelo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tipo de Vehículo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Año de Fabricación
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tipo de Motor
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Número de Asientos
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow
              key={vehicle.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{vehicle.license_plate}</TableCell>
              <TableCell align="left">{vehicle.brand}</TableCell>
              <TableCell align="right">{vehicle.model}</TableCell>
              <TableCell align="right">{vehicle.v_type}</TableCell>
              <TableCell align="right">{vehicle.year_of_manufacture}</TableCell>
              <TableCell align="right">{vehicle.engine_type}</TableCell>
              <TableCell align="right">{vehicle.seats}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(vehicle.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(vehicle.id)}
                  style={{ marginLeft: "0.5rem" }}
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

export default ListRepair;
