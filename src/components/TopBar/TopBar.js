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
                <img src="https://firebasestorage.googleapis.com/v0/b/dibujando-9b19b.appspot.com/o/icons%2FIcono.png?alt=media&token=d277cb99-9842-443f-aef3-2ff87cc1aaa0" alt="logo" id="icon"></img>
                <a href="/upload" id="subir"><button className="botones">Subir Dibujo</button></a>
                <div id="derecha">
                    <a style={{ float: "right" }} id="perfil" href="/profile"><img src="https://firebasestorage.googleapis.com/v0/b/dibujando-9b19b.appspot.com/o/icons%2FProfile.png?alt=media&token=49097c46-69f8-4759-9e53-9bdb35b44add" alt="perfil" id="logo"></img></a>
                    <button onClick={() => app.auth().signOut()} style={{ float: "right" }} className="botones" id="logout">Logout</button>
                    <label className="nbre">{this.usuario}</label>
                </div>
            </header>
        );
    }
}

export default TopBar;


