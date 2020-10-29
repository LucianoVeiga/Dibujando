import React from 'react';
import { firestore } from "../../../base";
import SideBar from '../../SideBar/SideBar.js';
import TopBar from '../../TopBar/TopBar.js';

import '../../../App.scss';
import './Categorias.css';

class Categorias extends React.Component {

    constructor(props) {
        super(props);
        this.renderPublicacion = this.renderPublicacion.bind(this);
        this.buscar = this.buscar.bind(this);
        this.state = {
          imagen: '',
          link: '',
          usuario: '',
          descripcion: '',
          categoria: ''
        }
    }

    buscar() {
        const search = document.getElementById('buscar').value;
        firestore.collection('Publicaciones')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
            if(search === doc.data().usuario || search === doc.data().categoria) {
                this.renderPublicacion(doc);
            }
            })
        })
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

    render() {
        return (
            <div>
                <div className="arriba">
                    <TopBar />
                </div>
                <div className="abajo">
                    <SideBar />
                    <div className="container">
                    <div className="TituloPrincipal">
                        <h5 className="fina">BUSCAR PUBLICACIONES</h5>
                    </div>
                    <div id="busqueda">
                        <label>¡Buscá la categoría que quieras!</label>
                        <div>
                            <input className="ingresar" name="buscar" id="buscar" placeholder="Categoría" />
                            <button className="botones" id="busca" onClick={this.buscar}>Buscar</button>
                        </div>
                    </div>
                    <ul id="atributos"></ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categorias;