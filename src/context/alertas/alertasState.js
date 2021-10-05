import React, {useReducer} from 'react'
import AlertaContext from './alertasContext';
import AlertaReducer from './alertasReducer';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types/index';


const AlertaState = props => {
    const initialState ={
        alerta: false,
        mensaje: '',
    }

const [ state, dispatch] = useReducer(AlertaReducer, initialState);

const mostrarAlerta = (msg) => {
    dispatch({
        type: MOSTRAR_ALERTA,
        payload: msg
    })

    setTimeout(() => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }, 2000);
}

return(
    <AlertaContext.Provider
        value={{
            alerta: state.alerta,
            mensaje: state.mensaje,
            mostrarAlerta
        }}
    >
        {props.children}
    </AlertaContext.Provider>
 )
}

export default AlertaState;