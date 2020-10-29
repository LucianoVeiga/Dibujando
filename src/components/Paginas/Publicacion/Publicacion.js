import React from 'react';
import { firestore } from "../../../base";
import app from "../../../base";
import TopBar from '../../TopBar/TopBar.js';
import SideBar from '../../SideBar/SideBar.js';

import '../../../App.scss';
import './Publicacion.css';

const publicaciones = firestore.collection('Publicaciones');
const usuarios = firestore.collection('Usuarios');

class Publicacion extends React.Component {

  constructor(props) {
    super(props);
    this.puntuar = this.puntuar.bind(this);
  }

  usuario;
  pubusuario = null;
  pubdescripcion;
  pubcategoria;
  pubvotantes;
  pubpuntuacion = 0;
  pubcantvotantes = 0;
  pubimagen;
  pubfecha;
  id;
  
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    this.id = urlParams.get('id');
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      this.usuario = doc.data().nombre + " " + doc.data().apellido;
    })
    publicaciones.doc(this.id).get().then(doc =>{
      this.pubusuario = doc.data().usuario;
      this.pubdescripcion = doc.data().descripcion;
      this.pubcategoria = doc.data().categoria;
      this.pubpuntuacion = doc.data().puntuacion;
      this.pubimagen = doc.data().imagenURL;
      this.pubvotantes = doc.data().votantes;
      this.pubcantvotantes = doc.data().cantidadVotantes;
      this.pubfecha = doc.data().fecha;
      this.setState({});
      for(let i = 0; i < this.pubcantvotantes; i ++) {
        console.log(this.pubvotantes[i]);
        if(this.pubvotantes[i] === this.usuario) {
          document.getElementById('titpuntua').style.visibility = "hidden";
          document.getElementById('puntuar').innerHTML = 'Ya puntuaste esta publicación';
          document.getElementById('puntuar').className = "deshabilitado";
          document.getElementById('puntuacion').style.visibility = "hidden";
        }
      }
    })
  }

  puntuar() {
    const votacion = document.getElementById('puntuacion').value * 1;
    if(votacion > 0 && votacion < 11) {
      this.pubcantvotantes = this.pubcantvotantes + 1;
      document.getElementById('titpuntua').style.visibility = "hidden";
      document.getElementById('puntuar').innerHTML = '¡Gracias por puntuar!';
      document.getElementById('puntuar').className = "deshabilitado";
      document.getElementById('puntuacion').style.visibility = "hidden";
      let suma;
      let vot;
      publicaciones.doc(this.id).get().then(doc => {
        suma = doc.data().sumapuntuaciones;
        vot = doc.data().votantes;
        vot.push(this.usuario);
        publicaciones.doc(this.id).update({
          votantes: vot,
          sumapuntuaciones: suma + votacion,
          puntuacion: (suma + votacion) / this.pubcantvotantes,
          cantidadVotantes: this.pubcantvotantes
        })
      })
    }
  }
    
  render() {
    return (
      <>
        <div className="arriba">
          <TopBar />
        </div>
        <div className="abajo">
          <SideBar />
          <div className="contenido" id="contenedorpublicacion">
            <div id="content">
              <div>
                <img alt="imagen" id='imagen' src={this.pubimagen}></img>
              </div>
              <div className="datos">
                <p>{this.pubdescripcion}</p>
                <div></div>
                <span id="letras">{this.pubusuario}</span>
                <span className="datos" id="categ">{this.pubcategoria}</span>
                <div className="puntua">
                  <span>{this.pubfecha}</span>
                </div>
                <div id="puntaje">
                  <span>{this.pubpuntuacion} calificación promedio de {this.pubcantvotantes} votantes</span>
                </div>
              </div>
            </div>
            <a href={this.pubimagen}><button className="botones" id="link">Ver imagen completa</button></a>
            <div className="puntua">
              <label className="titpuntua" id="titpuntua">¡Puntuá esta imagen!</label>
              <div id="p">
                <input className="ingresar" name="puntuacion" id="puntuacion" type="number" min="1" max="10" placeholder="Tu puntuación(0-10)" />
                <button className="botones" type="submit" id="puntuar" onClick={this.puntuar}>Puntuar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Publicacion;