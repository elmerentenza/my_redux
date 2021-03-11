import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            CRUD - React - Redux - REST Api & Axios
          </Link>
        </h1>
      </div>
      <Link
        to={"/productos/nuevo"}
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >
        Agregar Producto &#43;
      </Link>
    </nav>
  );
};

// Header.propTypes = {

// };

export default Header;
