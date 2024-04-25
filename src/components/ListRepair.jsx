import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
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
  const [repairs, setRepairs] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    repairService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las reparaciones.", response.data);
        setRepairs(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las reparaciones.",
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
      "¿Esta seguro que desea borrar esta reparación?"
    );
    if (confirmDelete) {
      repairService
        .remove(id)
        .then((response) => {
          console.log("La reparación ha sido eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar la reparación",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/repair/edit/${id}`);
  };

  return(
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/repair/create"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >

        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir reparación
        </Button>
        </Link>
        <br /> <br />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="Left" sx={{ fontWeight: "bold" }}>
                Tipo de reparación
              </TableCell>
              <TableCell align="Left" sx={{ fontWeight: "bold" }}>
                Patente
              </TableCell>
              <TableCell align="Left" sx={{ fontWeight: "bold" }}>
                Fecha de reparación
              </TableCell>
              <TableCell align="Left" sx={{ fontWeight: "bold" }}>
                Operaciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell align="Left">{repair.repair_type}</TableCell>
                <TableCell align="Left">{repair.license_plate}</TableCell>
                <TableCell align="Left">{repair.repair_date}</TableCell>
                <TableCell align="Left">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(repair.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(repair.id)}
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
