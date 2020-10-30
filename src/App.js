import React from 'react';
import { Route, Switch , BrowserRouter as Router } from "react-router-dom";
import Inicio from './components/Paginas/Inicio/Inicio.js';
import SignUp from './components/Paginas/SignUp/SignUp.js';
import Login from './components/Paginas/Login/Login.js';
import Publicacion from './components/Paginas/Publicacion/Publicacion.js';
import Upload from './components/Paginas/Upload/Upload.js';
import MiColeccion from './components/Paginas/MiColeccion/MiColeccion.js';
import Categorias from './components/Paginas/Categorias/Categorias.js';
import Perfil from './components/Paginas/Perfil/Perfil.js';
import PageNotFound from './components/Paginas/PageNotFound/PageNotFound.js';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route exact path="/publications" component={Publicacion} />
            <PrivateRoute path="/upload" component={Upload} />
            <PrivateRoute path="/mycollection" component={MiColeccion} />
            <PrivateRoute path="/categories" component={Categorias} />
            <PrivateRoute path="/profile" component={Perfil}/>
            <PrivateRoute path="/" exact component={Inicio} />
            <PrivateRoute path="/Dibujando" exact component={Inicio} />
            <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;