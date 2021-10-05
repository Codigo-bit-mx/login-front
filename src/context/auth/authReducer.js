import { 
    LOGIN_EXITOSO,
    REGISTRO_EXISTOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRARSESION,
    CAMBIOPERFIL,
    CAMBIOEDICION,
    OCULTAR_ALARMA 

    } from '../../types/index';

const AuthReducer = ( state, action ) => {
    switch (action.type) {
     
        case LOGIN_EXITOSO:
        case REGISTRO_EXISTOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                usuario: action.payload.usuario,
                error:''
            }
            
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload
            }
        
        case CERRARSESION:
            localStorage.removeItem('token');
            return {
                ...state,
                autenticado: false,
                token: null,
                usuario: null,
                editar: false
            }
        
        case CAMBIOPERFIL:
            return {
                ...state,
                editar: false
            }

        case CAMBIOEDICION:
            return{
                ...state,
                editar: true
            }

        case LOGIN_ERROR:
            return{
                ...state,
                alarma: true,
                error: action.payload
            }

        case OCULTAR_ALARMA: 
            return{
                ...state,
                alarma: false,
                error: ''
            }
        
        default: 
        return state;
    }
}

export default AuthReducer;