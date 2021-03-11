import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR, 
    
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,  
    
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,    
} from '../types';

// cada reducer tiene su propio state
const initialState = {
     productos: [],
     error: null,
     loading: false,
     productoeliminar: null,
     productoeditar: null,

     // eslint-disable-next-line
}

export default function productoReducer(state = initialState, action){
    switch(action.type){

        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,
                loading: true
            }
        
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINAR_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,

                productoeliminar: null,
                productoeditar: null,
            }

        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload,
            }

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload,
            }
        
        case PRODUCTO_ELIMINAR_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null,
            }


        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.filter(producto => 
                    producto.id !== action.payload.id ? 
                        producto = action.payload : 
                            producto),
            }

        default:
            return state;
    }
}