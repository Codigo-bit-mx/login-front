import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RutaPrivadas = ({component: Component, ...props}) => {
    
    const authcontext = useContext(AuthContext);
    const {autenticado, usuarioAutenticado} = authcontext;
    
    useEffect(() => {
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [])

    return ( 

        <Route { ...props} render={ props => !autenticado ? (
            <Redirect to = "/" />
        ) : (
            <Component { ...props} />
        )}
        />
     );
}
 
export default RutaPrivadas;