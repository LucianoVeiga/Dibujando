import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../../base";
import { firestore } from "../../../base";
import { analytics } from "../../../base";
import { AuthContext } from "../../../Auth";

import './SignUp.scss';
import '../../../App.scss';

const SignUp = ({ history }) => {
    const usuarios = firestore.collection("Usuarios");
    const [user, setUser] = useState({});
    const { currentUser } = useContext(AuthContext);

    const handleChange = async e => {
      setUser(Object.assign(user, { [e.target.name] : e.target.value }));
      analytics.logEvent('login', { setUser });
    };

    const handleSignUp = (async event => {
      event.preventDefault();
      const { email, password } = user;
      try {
        await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
        usuarios.doc(app.auth().currentUser.uid).set(user);
        history.push("/");
        console.log(user);
      } catch (error) {
      alert(error);
      }
    });

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form-container">
        <div>
          <div className="titulo">
            <h1 className="fina">REGISTRARSE</h1>
          </div>
          <form onSubmit={handleSignUp}>
            <div>
              <input type="email" className="ingresar" placeholder="Email" name="email" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <input type="password" className="ingresar" placeholder="Password" name="password" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <input type="input" className="ingresar" placeholder="Nombre" name="nombre" id="nombre" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <input type="input" className="ingresar" placeholder="Apellido" name="apellido" id="apellido" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <input type="input" className="ingresar" placeholder="Fecha de nacimiento" name="nacimiento" id="nacimiento" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <input type="input" className="ingresar" placeholder="Pais" name="pais" id="pais" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <select className="ingresar" name="sexo" id="sexo" defaultValue="Sexo" onChange={handleChange} required >
                <option value="Sexo" disabled>Sexo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
            <br />
            <div className="opcion">
              <button className="botones" type="submit">Crear</button>
            </div>
          </form>
          <div className="opcion">
            <h5 id="limitador">¿Ya tenés una cuenta?</h5>
            <button className="botones" id="crear" onClick={() => history.push('/login')}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
      );
    };  


  export default withRouter(SignUp);