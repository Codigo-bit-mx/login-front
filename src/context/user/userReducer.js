import {
    REGISTRO_ACTUALIZADO_EXITO,
    ALARMA
} from '../../types/index';


const UserReducer = (state, action) => {
    switch(action.type){

        case REGISTRO_ACTUALIZADO_EXITO:
            return{
                ...state,
                alarma: true,
                msg: action.payload
            }
        
        case ALARMA: 
            return{
                ...state,
                alarma: false,
                msg: ''
            }

        default: 
        return state;
    }
}

export default UserReducer;
