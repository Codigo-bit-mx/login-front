import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types/index';

const AlertaReducer = ( state, action ) => {
    switch(action.type){

        case MOSTRAR_ALERTA:
            return{
                alerta: true,
                mensaje: action.payload
            }
        
        case OCULTAR_ALERTA:
            return{
                alerta: false,
                mensaje: ''
            }


        default:
            return state;
    
    }
}

export default AlertaReducer;