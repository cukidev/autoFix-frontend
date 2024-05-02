import React from "react";
import logoImage from "../assets/logo.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logoImage} alt="Autofix Logo" className="logo-image" />
      </div>
      <div className="welcome-text">
        <h1 className="title">¡Bienvenido a Autofix!</h1>
        <p className="author">Creado por Paloma Zepeda Garrido</p>
      </div>
      <div className="project-info">
        <p>
          En el siguiente proyecto se realizará una aplicación monolítica en Java, donde se implementará tanto el Backend con Spring Boot, la Base de Datos con MySQL y la sección del Frontend con ReactJS. Además, estará desplegada en la nube y una sección de desarrollo y despliegue del producto final.
        </p>
        <p>
          AutoFix es una cadena de talleres especializados en el mantenimiento y reparación de vehículos. Dentro de la siguiente aplicación web, las principales funcionalidades serán:
        </p>
        <ul>
          <li>Registro de Vehículos.</li>
          <li>Registro de Reparaciones.</li>
          <li>Cálculo de Costo total de la reparación.</li>
          <li>Listado donde se muestren los valores involucrados en el cálculo de la fórmula.</li>
          <li>Listado de los 11 tipos de reparaciones.</li>
          <li>Listado con los tiempos promedio de reparación por cada una de las marcas de vehículos.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
