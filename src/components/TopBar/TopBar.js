import React from 'react';
import { firestore } from '../../base.js';
import app from '../../base';

import './TopBar.css';
import '../../App.scss';

const usuarios = firestore.collection("Usuarios");

class TopBar extends React.Component {

    usuario;

    componentDidMount() {
        usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
            this.usuario = doc.data().nombre + " " + doc.data().apellido;
        })
    }

    render() {
        return (
            <header>
                <img src="Images/Icono.png" alt="logo" id="icon"></img>
                <a href="/upload" id="subir"><button className="botones">Subir Dibujo</button></a>
                <div id="derecha">
                    <a style={{ float: "right" }} id="perfil" href="/profile"><img src="Images/Profile.png" alt="perfil" id="logo"></img></a>
                    <button onClick={() => app.auth().signOut()} style={{ float: "right" }} className="botones" id="logout">Logout</button>
                    <label className="nbre">{this.usuario}</label>
                </div>
            </header>
        );
    }
}

export default TopBar;


