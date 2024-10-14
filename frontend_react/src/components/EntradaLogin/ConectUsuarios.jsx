import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => { }, []);

  useEffect(() => {
    const listadousuarios = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8000/usuarios/');
        setUsuarios(respuesta.data);
      } catch (error) {
        console.error('Error al encontrar el listado de usuarios ', error);
      }
    };

    listadousuarios();
  }, []);
  
  return [(
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          <p>RUT: {usuario.rut}</p>
          <p>Nombre: {usuario.nombre}</p>
          <p>Rol: {usuario.rol}</p>
        </li>
      ))}
    </ul>
  )];
}

export default Usuarios;