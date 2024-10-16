import React, { useEffect, useState } from 'react'
import './EntradaLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EntradaLogin = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [recuerdame, setRecuerdame] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {   // Recupera datos del localStorage si existen
        const rutLocal = localStorage.getItem('rut');
        const passLocal = localStorage.getItem('password');
        if (rutLocal && passLocal) {
          setRut(rutLocal);
          setPassword(passLocal);
          setRecuerdame(true);
        } else {
          setRecuerdame(false);
        }
      }, []);

    const buscarUsuario = async () => { 
        try {
            const respuesta = await axios.get('http://localhost:8000/usuarios/'); //consume la bd
            setUsuarios(respuesta.data);                                          
            const usuario = respuesta.data.find(usuario => usuario.rut === rut);  //busca el usuario en el listado
            setUsuarioEncontrado(usuario);
            if (usuario) {
                console.log('Usuario encontrado:', usuario);
                console.log('Rol del usuario:', usuario.rol);
                return usuario;
            } else {
                console.error('Usuario no encontrado');
                return null;
            }
        } catch (error) {
            console.error('Error al encontrar el usuarios', error);
        }
    };

    const handleSubmit = async (e) => {   // Función al enviar el formulario
        e.preventDefault();
        
        const usuario = await buscarUsuario();

        if (usuario && usuario.password === password) {
            if (usuario.rol) {
                if (recuerdame) {
                    localStorage.setItem('rut', rut);
                    localStorage.setItem('password', password);
                }
                navigate(`/dashboard/${usuario.rol}`);
            } else {
                setMensaje('Rol no encontrado');
            }
        } else {
            setMensaje('Credenciales incorrectas');
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
                <input type="text" placeholder="Rut" required value={rut} onChange={(e) => setRut(e.target.value)}/>
            </div>
            <div className="cuadro-input">
                <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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

            <button type="submit">Iniciar Sesión</button>

        </form>
    </div>
  )
}
