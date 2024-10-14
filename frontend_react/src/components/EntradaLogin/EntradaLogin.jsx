import React, { useState } from 'react'
import './EntradaLogin.css'
import { useNavigate } from 'react-router-dom';
import { rolRut } from './rolRut';
import { ConectUsuarios } from './ConectUsuarios';

export const EntradaLogin = () => {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulamos la lógica para determinar el rol según el RUT
        const rol = rolRut(rut, password);
        console.log(`Rol del usuario: ${rol}`); 
        // Redirigimos al usuario a una página diferente según el rol

        if (rol) {
            navigate(`/dashboard/${rol}`);
        } else {
            setError('Credenciales incorrectas');
        }
    };

  return (
    <div className="login">
        <form onSubmit={handleSubmit}>
            <h1>Inicia Sesión</h1>
            
            <div className="cuadro-input">
                <input type="text" placeholder="Rut" required/>
            </div>
            <div className="cuadro-input">
                <input type="password" placeholder="Contraseña" required value={rut} onChange={(e) => setRut(e.target.value)}/>
            </div>

            <div className="recordar-olvidar">
                <label> <input type="checkbox"/>Recuérdame</label>
                <a href="/recupera">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit">Iniciar Sesión</button>

            {/* <div class="registrarse">
                <p>¿No tienes cuenta? <a href="#">Registarse</a></p>
                 <a href="#"></a>
            </div> */}
        </form>
    </div>
  )
}
