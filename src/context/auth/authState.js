import React, {useReducer} from 'react';
import AuthContext         from './authContext';
import AuthReducer         from './authReducer';
import clienteAxios        from '../../config/axios';
import tokenAuth           from '../../config/tokenAuth';
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


const AuthState = props => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: false,
        usuario: '',
        editar: false,
        alarma: false, 
        error: ''
    }

const [ state, dispatch ] = useReducer(AuthReducer, initialState);

const registroUsuario = async(usuario) => {
    
    try {
        const respuesta = await clienteAxios.post('api/auth/newuser', usuario);

        dispatch({
            type: REGISTRO_EXISTOSO,
            payload: respuesta.data
        })

    } catch (error) {
        console.log(error.response.data.msg);
    }

}

const iniciarSesion = async(datos) => {
    try{
        const respuesta = await clienteAxios.post('/api/auth/login', datos);
    
        dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta.data
        });
         usuarioAutenticado();
    }catch(error){  
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALARMA   
            })
        }, 2000);
    }
}

const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
   
    if(token){
       tokenAuth(token); //funcion para enviar el token al headear
    }
    try{    
        const respuesta = await clienteAxios.get('/api/auth/user'); 
        dispatch({
            type: OBTENER_USUARIO,
            payload: respuesta.data.usuario
        })
    }catch(error){
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
    }
}

//logue con google!
const onSignIn = async( date ) => {
    const {name, imageUrl, email} = date;    
    let datos = {
        nombre: name,
        img: imageUrl,
        email: email
    }
    try {
        const respuesta = await clienteAxios.post('/api/auth/google', datos );
        dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta.data
        });
         usuarioAutenticado();

    }catch (error) {
        console.log(error.response.data.msg)
    }
    
}



    const cambioPerfil = () => {
        dispatch({
            type: CAMBIOPERFIL
        })
    }

    const cambioEdicion = () => {
        dispatch({
            type: CAMBIOEDICION
        })
    }   


    const cerrarSesion = () => {
        console.log("cerrando sesion");
        dispatch({
            type: CERRARSESION
        })
    }

return (
    <AuthContext.Provider 
    value={{
        usuario: state.usuario, 
        autenticado: state.autenticado,
        editar: state.editar,
        alarma: state.alarma,
        error: state.error,
        registroUsuario,
        iniciarSesion,
        usuarioAutenticado,
        onSignIn,
        cambioPerfil,
        cambioEdicion,
        cerrarSesion,
        
    }}
    > 
        {props.children}
    </AuthContext.Provider>
 )
} 




export default AuthState;