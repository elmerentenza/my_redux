import React from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from 'prop-types';

// Redux
import {useDispatch} from 'react-redux';
import { borraProductosAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
  
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();

  const history = useHistory(); // habilitar history para redireccion

  const confirmarEliminarProducto = id => {
    // preguntarle al usuario 
    Swal.fire({
      title: 'Está seguro?',
      text: "Desea eliminar este producto? La accion será irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // pasarlo al action
        dispatch( borraProductosAction(id) );        
      }
    })


  }


  // function que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch( obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  }



  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button 
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >Editar</button>
        <button 
          type="button" 
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >Eliminar
        </button>
      </td>
    </tr>
  );
};

// Producto.propTypes = {

// };

export default Producto;
