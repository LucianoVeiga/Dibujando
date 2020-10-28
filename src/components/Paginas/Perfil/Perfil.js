import React from 'react';
import { firestore } from "../../../base";
import app from '../../../base';
import TopBar from '../../TopBar/TopBar.js';
import SideBar from '../../SideBar/SideBar.js';

import './Perfil.css';
import '../../../App.scss';

const usuarios = firestore.collection('Usuarios');
const publicaciones = firestore.collection('Publicaciones');

class Perfil extends React.Component {

  pnombre;
  papellido;
  ppais;
  pnacimiento;
  pemail = app.auth().currentUser.email;
  psexo;

  componentDidMount() {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      this.pnombre = doc.data().nombre;
      this.papellido = doc.data().apellido;
      this.ppais = doc.data().pais;
      this.pnacimiento = doc.data().nacimiento;
      this.psexo = doc.data().sexo;
      this.setState({});
    })
  }

  handleUpdate = () => {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      doc.update({
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        pais: document.getElementById('pais'),
        nacimiento: document.getElementById('nacimiento'),
        sexo: document.getElementById('sexo'),
        email: document.getElementById('email')
      })
    })
    console.log(document.getElementById('email'));
    app.auth().currentUser.updateEmail(document.getElementById('email'));
    console.log('¡Actualizado!');
  }

  handleDelete = () => {
    usuarios.doc(app.auth().currentUser.uid).delete();
    publicaciones
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if(doc.data().usuario === this.pnombre) {
            doc.delete();
          }
        })
      })
    app.auth().currentUser.delete();
    console.log('¡Eliminado!');
  }
  
  render() {
    return (
      <div>
        <div className="arriba">
          <TopBar />
        </div>
        <div className="abajo">
          <SideBar />
          <div className="content">
            <div>
              <div>
                <div className="tituloPrincipal">
                  <p id="tituloperfil" className="fina">MI PERFIL</p>
                </div>
                <label className="subtitulo">Personalizá la información de tu perfil acá.</label>
              </div>
              <br />
              <form>
                <div>
                  <label>Nombre</label>
                  <input type="input" className="ingresar" value={this.pnombre} id='nombre' name="nombre" />
                </div>
                <br />
                <div>
                  <label>Apellido</label>
                  <input type="input" className="ingresar" value={this.papellido} id='apellido' name="apellido" />
                </div>
                <br />
                <div>
                  <label>Email</label>
                  <input type="input" className="ingresar" value={this.pemail} id='email' name="email" />
                </div>
                <br />
                <div>
                  <label>País</label>
                  <input type="input" className="ingresar" value={this.ppais} id='pais' name="pais" />
                </div>
                <br />
                <div>
                  <label>Fecha de nacimiento</label>
                  <input type="input" className="ingresar" value={this.pnacimiento} id='nacimiento' name="nacimiento" />
                </div>
                <br />
                <div>
                  <label>Sexo</label>
                  <select className="ingresar" name="sexo" id="sexo" defaultValue={this.psexo} >
                    <option value={this.psexo} disabled>Sexo</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
                <br />
                <div id="guardado">
                  <button className="botones" type="submit" onClick={(this.handleUpdate)}>Guardar</button>
                </div>
              </form>
              <div id="otros">
                <button className="botones" id="logout" onClick={() => app.auth().signOut()}>Logout</button>
                <button className="botones" id="borrar" onClick={(this.handleDelete)}>Borrar Cuenta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;