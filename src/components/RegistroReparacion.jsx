import React from "react";

import logoImage from "../assets/logo.png";

const registroreparacion = () => {
    return (
      <div>
        <img src={logoImage} alt="Autofix Logo" style={{ width: '90px', height: 'auto' }} />
        <h1>Registro de Reparación</h1>
        <p>Registra la reparación del vehículo</p>
      </div>
    );
  };
export default registroreparacion;