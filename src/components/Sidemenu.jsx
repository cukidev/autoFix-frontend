import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { useNavigate } from "react-router-dom";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton onClick={() => navigate("/registroreparacion")}>
          <ListItemIcon>
            <HomeRepairServiceIcon />
          </ListItemIcon>
          <ListItemText primary="Registrear Reparación" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton onClick={() => navigate("/registrovehiculo")}>
          <ListItemIcon>
            <HomeRepairServiceIcon />
          </ListItemIcon>
          <ListItemText primary="Registrar Vehículo" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton onClick={() => navigate("/vehicle/list")}>
          <ListItemIcon>
            <HomeRepairServiceIcon />
          </ListItemIcon>
          <ListItemText primary="Listado de Vehículos" />
        </ListItemButton>
      </List>



    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
