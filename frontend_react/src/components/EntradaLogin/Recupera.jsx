import React from 'react'
import { Link } from 'react-router-dom'
export const Recupera = () => {
  return (
    <div className="login">
        <form>
            <h1>Cambiar contraseña</h1>
            
            <div className="cuadro-input">
                <input type="password" placeholder="Nueva contraseña" required/>
            </div>
            <div className="cuadro-input">
                <input type="password" placeholder="Confirme nuva contrasña" required/>
            </div>

            
            <Link to="/">
                <button>Cambiar</button>
            </Link>
        </form>
    </div>
  )
}
