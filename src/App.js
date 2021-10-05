import React        from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login        from './components/auth/Login';
import NuevaCuenta  from './components/auth/NuevaCuenta';
import Datos        from './components/informacion/Datos';
import RutaPrivadas from './components/rutas/RutaPrivadas';
import tokenAuth    from './config/tokenAuth';
//estados
import AuthState    from './context/auth/authState';
import AlertaState  from './context/alertas/alertasState';
import UserState    from './context/user/userState';


const token = localStorage.getItem('token');
  if(token) {
    tokenAuth(token);
  }


const App = () => {
  return (
  <AuthState>
    <AlertaState>
      <UserState>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <RutaPrivadas exact path="/informacion" component={Datos} />
      </Switch>
    </Router>
      </UserState>
    </AlertaState>
  </AuthState>
  );
}

export default App;