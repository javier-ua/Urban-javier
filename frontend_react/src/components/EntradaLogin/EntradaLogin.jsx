import React, { useEffect, useState } from "react";
import "./EntradaLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";

export const EntradaLogin = () => {
  //credenciales
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //mensajes de error
  const [mensaje, setMensaje] = useState("");
  //recordar campos con localstorage
  const [recuerdame, setRecuerdame] = useState(false);
  //usuarios recuperados de la bd
  const [usuarios, setUsuarios] = useState([]);
  //Ingresar con rut o correo (rut por defecto)
  const [alter, setAlter] = useState("rut");
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera datos del localStorage si existen
    const rutLocal = localStorage.getItem("rut");
    const passLocal = localStorage.getItem("password");
    if (rutLocal && passLocal) {
      setRut(rutLocal);
      setPassword(passLocal);
      setRecuerdame(true);
    } else {
      setRecuerdame(false);
    }
  }, []);

  const alternarCampo = () => {
    setAlter(alter === "rut" ? "email" : "rut");
  };

  const formateaRut = (r) => {
    const rutLimpio = r.replace(/[^0-9kK]/g, "");
    let cuerpo = rutLimpio.slice(0, -1);
    const guion = rutLimpio.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (guion) {
      return `${cuerpo}-${guion}`;
    }
    return cuerpo;
  };

  const handleRutChange = (e) => {
    setRut(formateaRut(e.target.value));
  };

  const buscarUsuario = async () => {
    //connecta con la bd para devolver usuario si existe
    try {
      const respuesta = await axios.get("http://localhost:8000/usuarios/"); //consume la bd
      setUsuarios(respuesta.data);
      const usuario = respuesta.data.find((usuario) => usuario.rut === rut); //busca el usuario en el listado
      if (usuario) {
        console.log("Usuario encontrado:", usuario);
        console.log("Rol del usuario:", usuario.rol);
        return usuario;
      } else {
        console.error("Usuario no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al encontrar el usuarios", error);
    }
  };

  const handleSubmit = async (e) => {
    // Función al enviar el formulario
    e.preventDefault();

    const usuario = await buscarUsuario();

    if (!usuario) {
      setMensaje("Usuario no encontrado");
      return;
    }

    if (usuario.password === password) {
      if (usuario.rol) {
        if (recuerdame) {
          localStorage.setItem("rut", rut);
          localStorage.setItem("password", password);
        }
        navigate(`/dashboard/${usuario.rol}`);
      } else {
        setMensaje("Rol no encontrado");
      }
    } else {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Inicia Sesión</h1>

        {mensaje && (
          <div className="mensaje-error">
            <p>{mensaje}</p>
          </div>
        )}

        <div className="cuadro-input">
          <div className="campo-rut">
            <input
              type="text"
              placeholder="Rut"
              required
              value={rut}
              onChange={handleRutChange}
              maxLength={12}
            />
            <button className="rut-correo" onClick={alternarCampo}>
              Ingresar con correo
            </button>
          </div>
        </div>
        <div className="cuadro-input">
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="recordar-olvidar">
          <label>
            <input
              type="checkbox"
              checked={recuerdame}
              onChange={(e) => setRecuerdame(e.target.checked)}
            />
            Recuérdame
          </label>
          <a href="/recupera">¿Olvidaste tu contraseña?</a>
        </div>

        <button className="boton-iniciar" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
