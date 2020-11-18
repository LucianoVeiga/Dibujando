import React, { useState } from 'react';
import { storage, firestore } from "../../../base";
import SideBar from '../../SideBar/SideBar.js';
import TopBar from '../../TopBar/TopBar.js';
import app from "../../../base";
import { useHistory } from "react-router-dom";

import './Upload.css';
import '../../../App.scss';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const publicaciones = firestore.collection("Publicaciones");
  const usuarios = firestore.collection('Usuarios');
  let history = useHistory();
  let pubusuario;
  
  usuarios.doc(app.auth().currentUser.uid)
    .get()
    .then(doc => {
      pubusuario = doc.data().nombre + " " + doc.data().apellido;
  });
  
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    const categoria = document.getElementById("cat").value;
    const descripcion = document.getElementById("texto").value;
    let dia = new Date();
    let fecha = dia.getDate() + "/" + (dia.getMonth() + 1) + "/" + dia.getFullYear();
    console.log(url);
    uploadTask.on("state_changed", (e) => {
      if(e.bytesTransferred === e.totalBytes) {
        console.log(e);
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setUrl(url);
            if(url){
              publicaciones
                .add({
                  usuario: pubusuario,
                  imagenURL: url,
                  descripcion: descripcion,
                  categoria: categoria,
                  sumapuntuaciones: 0,
                  puntuacion: 0,
                  votantes: [],
                  cantidadVotantes: 0,
                  fecha: fecha,
                  iaCalif: 0
                })
                .then(docRef => {
                  history.push('/publications/?id=' + docRef.id);
              });
            }
          });
      }
    });
  };
  
  const clickReal = () => {
      document.getElementById("botonreal").click();
  };

  return (
    <div>
        <div className="arriba">
          <TopBar />
        </div>
        <div className="abajo">
          <SideBar />
          <div className="contenido">
            <div className="TituloPrincipal">
              <h5 className="fina">CREAR PUBLICACIÓN</h5>
            </div>
            <div>
                <div className="publicacion">
                  <div>
                    <label id="titulo">Imagen</label>
                    <br />
                    <input id="botonreal" name="botonreal" type="file" hidden="hidden" onChange={handleChange} />
                    <button id="botonfalso" className="botones" onClick={clickReal}><img src="https://firebasestorage.googleapis.com/v0/b/dibujando-9b19b.appspot.com/o/icons%2FUpload.png?alt=media&token=3d936852-afd2-4b68-af9a-fa0a5a6f6779" alt="logo" id="upload"></img></button>
                    <br />
                  </div>
                  <div id="descripcion">
                    <label id="titulo">Descripción</label>
                    <br />
                    <textarea rows="10" cols="50" className="barra" id="texto" maxLength = "250" placeholder="Solo podés escribir hasta 250 carácteres." required />
                  </div>
                  <div id="categoria">
                    <label id="titulo">Categoría</label>
                    <input className="ingresar" name="Categoria" id="cat" required />
                  </div>
                </div>
                <br />
                <button id="boton" className="botones" type="submit" onClick={handleUpload}>Crear</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Upload;
