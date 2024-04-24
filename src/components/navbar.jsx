import React, { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Sidemenu from './Sidemenu';
import logoImage from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 12 }}>
      <AppBar position="sticky" className="appBar" sx={{
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        backgroundColor: '#f03562',
        width: '100%',
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
            Autofix
          </Typography>

          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <Button color="inherit">Logearse</Button>
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}