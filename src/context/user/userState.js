import React, {useReducer} from 'react';
import UserContext         from './userContext';
import UserReducer         from './userReducer';
import clienteAxios        from '../../config/axios';

import {
    REGISTRO_ACTUALIZADO_EXITO,
    ALARMA
} from '../../types/index';

const UserState = props => {
    const initialState = {
        alarma: false,
        msg: ''
    }

const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const actualizarDatos = async (id, imguser, newdateuser) => {
        console.log(imguser.name)
        try {
        if( imguser.name !== undefined ) {
            actualizarImg(id, imguser);
        }    
        
         const respuesta = await clienteAxios.put(`/api/user/${id}`, newdateuser);    
            console.log(respuesta)
           
         dispatch({
             type: REGISTRO_ACTUALIZADO_EXITO,
             payload: respuesta
        })
         
         setTimeout(() => {
            dispatch({
                type: ALARMA
            })
         }, 2000);
        
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarImg = async (id, imguser) => {
        const formDate = new FormData();
        formDate.append('archivo', imguser);
        try{
           await clienteAxios.put(`/api/user/imagen/${id}`, formDate);
        }catch (error) {
            console.log(error.response.data.msg);
        }
    }

return(
    <UserContext.Provider
        value={{
            alarma: state.alarma,
            msg: state.msg,
            actualizarDatos
        }}
    >

        {props.children}
    </UserContext.Provider>
  )
}

export default UserState;