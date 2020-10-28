import React from 'react';
import { firestore } from "../../../base";
import app from "../../../base";
import TopBar from '../../TopBar/TopBar.js';
import SideBar from '../../SideBar/SideBar.js';

import '../../../App.scss';
import './Publicacion.css';

let publicaciones = firestore.collection('Publicaciones');
let usuarios = firestore.collection('Usuarios');

class Publicacion extends React.Component {

  constructor(props) {
    super(props);
    this.puntuar = this.puntuar.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    })
    if(this.pubcantvotantes > 0) {
      for(let i = 0; i < this.pubcantvotantes; i ++) {
        if(this.pubvotantes[i] === this.usuario) {
          document.getElementsByClassName('titpuntua').hidden = true;
          document.getElementById('puntuar').innerHTML = 'Ya puntuaste esta publicación';
          document.getElementById('puntuar').className = "deshabilitado";
          document.getElementById('puntuacion').style.visibility = "hidden";
        }
      }
    }
  }

  puntuar() {
    this.pubcantvotantes = this.pubcantvotantes + 1;
    document.getElementsByClassName('titpuntua').hidden = true;
    document.getElementById('puntuar').innerHTML = '¡Gracias por puntuar!';
    document.getElementById('puntuar').className = "deshabilitado";
    document.getElementById('puntuacion').style.visibility = "hidden";
    const voto = document.getElementById('puntuacion');
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      this.usuario = doc.data().nombre + " " + doc.data().apellido;
    })
    publicaciones.doc(this.id).get().then(doc =>{
      doc.data().votantes.push(this.usuario);
      doc.data().sumapuntuaciones = doc.data().sumapuntuaciones + voto;
      doc.data().puntuacion = doc.data().sumapuntuaciones / this.pubcantvotantes;
      doc.data().scantidadVotantes = this.pubcantvotantes;
    })
  }
    
  render() {
    return (
      <div>
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
              <label className="titpuntua">¡Puntuá esta imagen!</label>
              <div id="p">
                <select className="ingresar" name="puntuacion" id="puntuacion" defaultValue="puntuacion" >
                  <option value="puntuacion" disabled>Tu puntuación</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button className="botones" type="submit" id="puntuar" onClick={this.puntuar}>Puntuar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Publicacion;