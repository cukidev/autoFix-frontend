import React from "react";

import logoImage from "../assets/logo.png";

const Home = () => {
    return (
      <div>
        <img src={logoImage} alt="Autofix Logo" style={{ width: '90px', height: 'auto' }} />
        <h1>Bienvenido a Autofix</h1>
        <p>Creado por Paloma Zepeda Garrido</p>
      </div>
    );
  };
export default Home;
