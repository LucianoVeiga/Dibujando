import React from 'react';
import { firestore } from '../../../base.js';
import TopBar from '../../TopBar/TopBar.js';
import SideBar from '../../SideBar/SideBar.js';

import '../../../App.scss';

class Inicio extends React.Component {

  constructor(props) {
    super(props);
    this.renderPublicacion = this.renderPublicacion.bind(this);
    this.state = {
      imagen: '',
      link: '',
      usuario: '',
      descripcion: '',
      categoria: ''
    }
  }

  renderPublicacion(doc){
    let atributos = document.querySelector('#atributos');
    let li = document.createElement('div');

    let imagenp = document.createElement('img');
    let usuariop = document.createElement('label');
    let descripcionp = document.createElement('label');
    let categoriap = document.createElement('label');
    let a = document.createElement('a');
    let div = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    this.setState({
      link: "/publications/?id=" + doc.id,
      imagen: doc.data().imagenURL,
      descripcion: doc.data().descripcion,
      usuario: doc.data().usuario,
      categoria: doc.data().categoria
    });
    
    li.className = 'cuadrado';
    a.href = this.state.link;
    div.className = 'vistapreviaej';
    imagenp.src = this.state.imagen;
    imagenp.className = 'vistapreviaej';
    descripcionp.textContent = this.state.descripcion;
    descripcionp.className = 'c';
    usuariop.textContent = this.state.usuario;
    usuariop.className = 'c';
    usuariop.id = 'letras';
    categoriap.textContent = this.state.categoria;
    categoriap.className = 'c';
    categoriap.id = 'categ';
    
    li.appendChild(a);
    a.appendChild(div);
    div.appendChild(imagenp);
    li.appendChild(descripcionp);
    li.appendChild(usuariop);
    li.appendChild(categoriap);

    atributos.appendChild(li);
  }
  
  componentDidMount() {
    firestore.collection('Publicaciones')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.renderPublicacion(doc);
        })
    })
  }

  render() {
    return (
      <>
        <div className="arriba">
          <TopBar />
        </div>
        <div className="abajo">
          <SideBar />
          <div className="container">
            <div className="TituloPrincipal">
              <h5 className="fina">PUBLICACIONES</h5>
            </div>
            <ul id="atributos"></ul>
          </div>
        </div>
      </>
    );
  }
}

export default Inicio;