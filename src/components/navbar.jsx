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
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 12 }}>
      <AppBar position="fixed" className="appBar" sx={{
        justifyContent: 'center',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        backgroundColor: '#f03562',
        width: '100%',
        top: 0,
        left: 0,
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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

          <img src={logoImage} alt="Logo" style={{height: '50px', marginRight: '10px'}} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h5" component="div" sx={{ fontFamily: 'monospace' }}>
                Autofix
              </Typography>
            </Link>
          </div>

          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}