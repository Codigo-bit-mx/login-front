import React, { useContext, useState, useEffect }        from 'react';
import styled                                            from 'styled-components';
import { AiFillGithub, AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";
import { Link }            from 'react-router-dom';
import authContext         from '../../context/auth/authContext';
import AlertaContext       from '../../context/alertas/alertasContext';
import { GoogleLogin }     from 'react-google-login';
import LoginGithub         from 'react-login-github'; 

const FormUsuario = styled.div`
    background-color: #171717;
    height: 100vh;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media(min-width: 768px){
        min-height: 350px;
    }
`;

const ContenedorForm = styled.div`
    padding: 1em 1em;
    width: 100%;
    max-width: 300px;
    height: 600px;
    background-color: #171717;
    color: white;

    P{
        text-align: center;
        margin: 2em 0;
        font-size: 14px;
        font-family: 'Noto Sans', sans-serif;
        line-height: 22px;
    }
    @media(min-width: 768px){
       padding: 1em 1em;
       max-width: 400px;
    }
`;

const CampoForm = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 2em;
    align-items: center;

    input[type="email"] {
        
        border: 1px solid #e1e1e1;
        padding: 1rem;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        font-weight: 550;

    }
    
    input[type="password"]{
        
        border: 1px solid #e1e1e1;
        padding: 1rem;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        font-weight: 550;
    }

    input::placeholder{
        color: #828282;
        font-family: "Font Awesome 5 Free";
    }

    input[type="submit"]{
        width: 100%;
        background-color: #2F80ED;
        color: white;
        padding: 10px 0;
        border: 1px solid #2F80ED;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
    }
`;

const ContenedorRedes = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 13px;
    padding: 10px 2em;

    @media(min-width: 768px){
        grid-gap: 16px;
        padding: 10px 5em;
    }
`; 

const RedesIcon = styled.div`
    border: 1px solid #fff;
    border-radius: 100%;
    p{
        margin: 0;
        color: white;
        font-weight: 550;
        font-size: 20px;
        padding: 16px;
        cursor: pointer;
    }
    &:hover{
        transition: .2s ease-in-out;
        background-color: #ffffff;
    p{
        color: #333333;
    }
    }
`;

const NuevaCuenta = styled.div`
    margin: 1.5em 0;
    a{
        text-align: center;
        color: white; 
    }
`;

const Alarma = styled.div`
    margin: 0 auto 1em auto;
    width: 90%;
    border: 1px solid #e01919;
    padding: 10px 5px;
    border-radius: 12px;

    p{
        color: white;
        font-size: 12px;
        margin: 0;
    }
`;

const Login = (props) => {

    const authContexts = useContext(authContext)
    const {autenticado, alarma, error, iniciarSesion, onSignIn} = authContexts;
    const alertaContext = useContext(AlertaContext);
    const {alerta, mensaje, mostrarAlerta} = alertaContext;

    useEffect(() => {
        if(autenticado){    
            props.history.push('/informacion');
        }
    }, [autenticado, props.history]);


    const [usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario; 

    //cambio
    const datosForm = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value  
        })
    };

    const envioDatos = (e) => {
        e.preventDefault();
         if(email.trim() === '' || password.trim() === ''){ 
             mostrarAlerta("los datos estan incompletos");
             return
            }
            // logeo
            iniciarSesion(usuario);
        }
    
    //logue con google
        const responseGoogle = (response) => {  
            if(response.error){
                console.log("entro en el error");
                return
        
            }else{
                const date = response.profileObj;
                onSignIn(date);
            }
        }

    // logueo con github
    const onSuccess = response => console.log(response);
    const onFailure = response => console.error(response);  

    return (
        
        <FormUsuario>

            <ContenedorForm>
                <h3>CodigoBitMx.!</h3>
                <p>Ingresa a tu perfil de codigoBit descrubre las nuevas implementaciones</p>

            <form
                onSubmit={envioDatos}
            >
                <CampoForm>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder=" Ingresa tu email"
                        onChange = { datosForm }
                    />
                </CampoForm>

                <CampoForm>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder=" Ingresa tu password"
                        onChange = { datosForm }
                    />
                </CampoForm>

                {alerta ? 
                <Alarma> <p>{mensaje}</p> </Alarma>
                 : null}

                {alarma ? 
                <Alarma> <p>{error}</p> </Alarma>
                : null}

                <CampoForm>
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                    />
                </CampoForm>

            </form>

            <p>O continuar con estos perfiles sociales </p>
        
            <ContenedorRedes>
               
                <GoogleLogin
                clientId="866270435461-psgl6qom45nv9bcf3j09j0h7j6mqqdnm.apps.googleusercontent.com"  
                render={renderProps => (
                    <RedesIcon onClick={renderProps.onClick} disabled={renderProps.disabled}><p> <AiOutlineGoogle /></p></RedesIcon>
                )}
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />

                <RedesIcon><p> <AiFillFacebook /> </p></RedesIcon>

                {/* <RedesIcon><AiFillGithub/></RedesIcon> */}

                
                 <LoginGithub
                 className="buttongit"
                 clientId="bfc54be637408848b2b9"
                 buttonText=""
                 onSuccess={onSuccess}
                 onFailure={onFailure}> <span><AiFillGithub/></span> </LoginGithub>

    
            </ContenedorRedes>

            <NuevaCuenta>
            <Link to={'/nueva-cuenta'}>
               <p> Obtenen un cuenta aqui</p>
            </Link>
            </NuevaCuenta>

            </ContenedorForm>

        </FormUsuario>

    )
}


export default Login;