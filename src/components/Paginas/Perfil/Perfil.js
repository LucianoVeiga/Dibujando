import React from 'react';
import { firestore } from "../../../base";
import app from '../../../base';
import TopBar from '../../TopBar/TopBar.js';
import SideBar from '../../SideBar/SideBar.js';

import './Perfil.css';
import '../../../App.scss';

const usuarios = firestore.collection('Usuarios');

class Perfil extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
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

  handleUpdate() {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      usuarios.doc(app.auth().currentUser.uid).update({
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        pais: document.getElementById('pais').value,
        nacimiento: document.getElementById('nacimiento').value,
        sexo: document.getElementById('sexo').value,
        email: document.getElementById('email').value
      })
    })
    app.auth().currentUser.updateEmail(document.getElementById('email').value);
    console.log('¡Actualizado!');
  }

  handleDelete() {
    app.auth().currentUser.delete();
    usuarios.doc(app.auth().currentUser.uid).delete();
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
              <div>
                <label>Nombre</label>
                <input type="input" className="ingresar" defaultValue={this.pnombre} id='nombre' name="nombre" />
              </div>
              <br />
              <div>
                <label>Apellido</label>
                <input type="input" className="ingresar" defaultValue={this.papellido} id='apellido' name="apellido" />
              </div>
              <br />
              <div>
                <label>Email</label>
                <input type="input" className="ingresar" defaultValue={this.pemail} id='email' name="email" />
              </div>
              <br />
              <div>
                <label>País</label>
                <input type="input" className="ingresar" defaultValue={this.ppais} id='pais' name="pais" />
              </div>
              <br />
              <div>
                <label>Fecha de nacimiento</label>
                <input type="input" className="ingresar" defaultValue={this.pnacimiento} id='nacimiento' name="nacimiento" />
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
                <button className="botones" onClick={(this.handleUpdate)}>Guardar</button>
              </div>
              <div id="otros">
                <button className="botones" id="logout" onClick={() => app.auth().signOut()}>Logout</button>
                <div>
                  <button className="botones" id="borrar" onClick={(this.handleDelete)}>Borrar Cuenta</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;