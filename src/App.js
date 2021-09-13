import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Datos from './components/informacion/Datos';

const App = () => {
  return (
  
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/nueva-cuenta" component={NuevaCuenta}></Route>
        <Route exact path="/informacion" component={Datos}></Route>
      </Switch>
    </Router>

  );
}

export default App;