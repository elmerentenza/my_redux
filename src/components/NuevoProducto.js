import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import PropTypes from 'prop-types';

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions';

 

// cuando se usa react-router-dom... se pude pasar el history por props
const NuevoProducto = ({history}) => {

    // state del componente (esto solo se usara aqui)
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    // Acceder al store y leer el state
    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // mandar llamar el action de productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    // cuando el usuario haga submit
    const submitNuevoProducto = (e) => {
        e.preventDefault();
        
        // validar formulraio
        if (nombre.trim() === '' || precio <= 0){

            const alerta = {
                msg: "Ambos campos son obligatorios",
                classes: "alert alert-danger text-center text-uppercase p3"
            }
            dispatch( mostrarAlertaAction(alerta) );

            return;
        }
        
        // si no hay errores
        dispatch( ocultarAlertaAction() );
        
        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // limpiando el formulario
        guardarNombre('');
        guardarPrecio('');

        //redireccionar
        history.push('/');

    }

    const handleOnChange = (e) => {
        if (e.target.name === 'nombre' )
            guardarNombre(e.target.value);
        if (e.target.name === 'precio' )
            guardarPrecio(Number(e.target.value));
        //dispatch( ocultarAlertaAction() );
    }

    return (

        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}> {alerta.msg}</p> : null}
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        { cargando ? <p>Cargando....</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }                        
                    </div>
                </div>
            </div>
        </div>
    );
};

// NuevoProducto.propTypes = {
    
// };

export default NuevoProducto;