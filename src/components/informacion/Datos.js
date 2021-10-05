import React, { useContext, useEffect } from 'react';
import Menu        from './Menu';
import Perfil      from './Perfil';
import Edicion     from './Edicion';
import styled      from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';
const DateContent = styled.div`
    background-color: #171717;
    height: 100%;
    width: 100%;
`;

const Presentacion = styled.div`

    h2{
        color: white;
        text-align:center;
        font-family: 'Noto Sans', sans-serif;
    }
    p{
        color: white;
        text-align: center;
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
        margin-top: 2em;
    }

`;

const Datos = () => {

    const authContext = useContext(AuthContext);
    const {editar, usuarioAutenticado} = authContext;
    const userContext = useContext(UserContext);
    const { alarma } = userContext;

    useEffect(() => {
        usuarioAutenticado()
    }, [alarma, usuarioAutenticado]);

    return(

    <DateContent>
        
        <Menu />


    <Presentacion>
        <h2>Información personal</h2>
        <p>¿Te gusta tu foto y tu nombre de perfil?</p>
    </Presentacion>


    { !editar ? (
        <Perfil />
    ) : (
        <Edicion />
    ) }

    </DateContent>

    )
}


export default Datos;