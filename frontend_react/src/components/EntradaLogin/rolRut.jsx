// simular conexion con bd

const usuarios = {
    usuario1: {
        rut: '11.111.111-1',
        password: '1234',
        rol: 'admin'
    },
    usuario2: {
        rut: '22.222.222-2',
        password: '1234',
        rol: 'usuario'
    }
};

export const rolRut = (r, p) => {
    const usuario = usuarios[r];
    if (usuario && usuario.password === p) {
        return usuario.rol;
    }
    return 'admin';
};
