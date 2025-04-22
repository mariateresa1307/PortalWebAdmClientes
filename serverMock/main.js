const express = require('express');
const cors = require('cors');
const { send } = require('process');
const app = express();
const port = 4000;

// disable cors
app.use(cors());


app.get('/auth/login', (req, res) => {
    return res.json([{ loginUsuario: 'Administrador' }]);
});

app.get('/paginas/usuario/:idUsuario', (req, res) => {
    return res.json([
        { nombrePagina: 'Usuarios' },
        { nombrePagina: 'Clientes' },
        { nombrePagina: 'Rep Clientes' },
        { nombrePagina: 'Rep Operaciones x Usuario' },
        { nombrePagina: 'changePassword' }
    ]);
})


app.get('/dominios/:idDominio', (req, res) => {
    const { idDominio } = req.params;
    let data = [];

    switch (idDominio) {
        case 'DNIO_TIPO_USUARIO':
            data = [{
                dnioSignificado: 'Administrador',
                dnioValor: 'A'
            }]

            break;
        case 'DNIO_DPTO_USUARIO':
            data = [{
                dnioSignificado: 'Administración',
                dnioValor: 'AD'
            }]
            break;
        case 'DNIO_ESTATUS_USUARIO':
            data = [{
                dnioSignificado: 'Activo',
                dnioValor: 'A'
            }]
            break;
        case 'DNIO_TIPO_CLIENTE':
            data = [{
                dnioSignificado: 'Cliente',
                dnioValor: 'C'
            }]
            break;
        case 'DNIO_TIPO_MODIFICACION':  
            data = [{
                dnioSignificado: 'Modificación',
                dnioValor: 'M'
            }]
            break;
        default:
            return res.status(404).json({ error: 'Dominio no encontrado' });

    }

    return res.json(data);
})


app.get('/roles', (req, res) => {
    return res.json([
        { nombreRol: 'Administrador' },
        { nombreRol: 'Operador' },
        { nombreRol: 'Cliente' }
    ]);
})



app.get('/usuarios', (req, res) => {
    const data = {
        data: [
            {
                nombre: 'Ana',
                apellido: 'González',
                nombreTipo: 'Empleado',
                correo: 'ana.gonzalez@example.com',
                nombreDepartamento: 'Ventas',
                nombreRol: 'Ejecutivo de Ventas',
                nombreActivo: 'Sí',
                loginUsuario: 'agonzalez',
                accion: 'Editar', // Using string instead of Element for simplicity
            },
            {
                nombre: 'Carlos',
                apellido: 'Pérez',
                nombreTipo: 'Empleado',
                correo: 'carlos.perez@example.com',
                nombreDepartamento: 'Marketing',
                nombreRol: 'Analista de Marketing',
                nombreActivo: 'Sí',
                loginUsuario: 'cperez',
                accion: 'Editar',
            },
            {
                nombre: 'Laura',
                apellido: 'Rodríguez',
                nombreTipo: 'Administrador',
                correo: 'laura.rodriguez@example.com',
                nombreDepartamento: 'IT',
                nombreRol: 'Administrador de Sistemas',
                nombreActivo: 'Sí',
                loginUsuario: 'lrodriguez',
                accion: 'Editar',
            },
            {
                nombre: 'Javier',
                apellido: 'López',
                nombreTipo: 'Empleado',
                correo: 'javier.lopez@example.com',
                nombreDepartamento: 'Recursos Humanos',
                nombreRol: 'Asistente de RRHH',
                nombreActivo: 'No',
                loginUsuario: 'jlopez',
                accion: 'Editar',
            },
            {
                nombre: 'Sofía',
                apellido: 'Martínez',
                nombreTipo: 'Empleado',
                correo: 'sofia.martinez@example.com',
                nombreDepartamento: 'Finanzas',
                nombreRol: 'Contador Junior',
                nombreActivo: 'Sí',
                loginUsuario: 'smartinez',
                accion: 'Editar',
            },
            {
                nombre: 'Diego',
                apellido: 'Sánchez',
                nombreTipo: 'Empleado',
                correo: 'diego.sanchez@example.com',
                nombreDepartamento: 'Ventas',
                nombreRol: 'Gerente de Ventas',
                nombreActivo: 'Sí',
                loginUsuario: 'dsanchez',
                accion: 'Editar',
            },
            {
                nombre: 'Isabela',
                apellido: 'Ramírez',
                nombreTipo: 'Empleado',
                correo: 'isabela.ramirez@example.com',
                nombreDepartamento: 'Marketing',
                nombreRol: 'Diseñador Gráfico',
                nombreActivo: 'Sí',
                loginUsuario: 'iramirez',
                accion: 'Editar',
            },
            {
                nombre: 'Mateo',
                apellido: 'Vargas',
                nombreTipo: 'Administrador',
                correo: 'mateo.vargas@example.com',
                nombreDepartamento: 'IT',
                nombreRol: 'Jefe de Desarrollo',
                nombreActivo: 'Sí',
                loginUsuario: 'mvargas',
                accion: 'Editar',
            },
            {
                nombre: 'Valentina',
                apellido: 'Castro',
                nombreTipo: 'Empleado',
                correo: 'valentina.castro@example.com',
                nombreDepartamento: 'Recursos Humanos',
                nombreRol: 'Especialista en Talento Humano',
                nombreActivo: 'Sí',
                loginUsuario: 'vcastro',
                accion: 'Editar',
            },
            {
                nombre: 'Sebastián',
                apellido: 'Jiménez',
                nombreTipo: 'Empleado',
                correo: 'sebastian.jimenez@example.com',
                nombreDepartamento: 'Finanzas',
                nombreRol: 'Analista Financiero',
                nombreActivo: 'No',
                loginUsuario: 'sjimenez',
                accion: 'Editar',
            },
        ],
        page: 1,
        pageCount: 2,
        itemsPerPage: 10,
        activeUsers: 8,
        inactiveUsers: 2,
        totalUsers: 10,
    };
    return res.json(data)
})


app.get('/acciones/usuario/:usuario/pagina/:numeroPagina', (req, res) => {
  
    const data = [
        { codAccion: '1', nombreAccion: 'Insertar' },
        { codAccion: '2', nombreAccion: 'Modificar' },
        { codAccion: '3', nombreAccion: 'Eliminar' },
        { codAccion: '4', nombreAccion: 'Resetear Clave' },
        { codAccion: '5', nombreAccion: 'Modificar Correo' },
        { codAccion: '6', nombreAccion: 'Modificar Estatus' },
        { codAccion: '7', nombreAccion: 'Validar Datos' },
    ];


    return res.json(data);
})




app.get('/clientes', (req, res) => {

    // Simulate a database query based on the parameters
    const data = {
        data: [
            {
                id: 1,
                codAbonado: 12345,
                nombre: 'Electrodomésticos S.A.',
                correo: 'info@electrodomesticos.com',
                tipoCliente: 'Empresa',
                documento: 'J-12345678-9',
                fechaRegistro: '2024-01-15',
                fechaActivacion: '2024-01-20',
                status: 'Activo',
                telefono: 2125551122,
                
            },
            {
                id: 2,
                codAbonado: 67890,
                nombre: 'María Rodríguez',
                correo: 'maria.rodriguez@example.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-9876543',
                fechaRegistro: '2024-02-01',
                fechaActivacion: '2024-02-05',
                status: 'Inactivo',
                telefono: 4141234567,
                
            },
            {
                id: 3,
                codAbonado: 13579,
                nombre: 'Servicios Integrales C.A.',
                correo: 'servicios@integrales.net',
                tipoCliente: 'Empresa',
                documento: 'J-98765432-1',
                fechaRegistro: '2024-03-10',
                fechaActivacion: '2024-03-15',
                status: 'Activo',
                telefono: 2129998877,
                
            },
            {
                id: 4,
                codAbonado: 24680,
                nombre: 'Pedro Pérez',
                correo: 'pedro.perez@domain.org',
                tipoCliente: 'Persona Natural',
                documento: 'E-1234567',
                fechaRegistro: '2024-04-01',
                fechaActivacion: '2024-04-07',
                status: 'Activo',
                telefono: 4241122334,
                
            },
            {
                id: 5,
                codAbonado: 11223,
                nombre: 'Inversiones Globales',
                correo: 'inversiones@globales.com.ve',
                tipoCliente: 'Empresa',
                documento: 'J-00112233-4',
                fechaRegistro: '2024-05-05',
                fechaActivacion: '2024-05-10',
                status: 'Inactivo',
                telefono: 2127776655,
                
            },
            {
                id: 6,
                codAbonado: 33445,
                nombre: 'Luisa Fernández',
                correo: 'luisa.fernandez@email.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-5432109',
                fechaRegistro: '2024-06-12',
                fechaActivacion: '2024-06-18',
                status: 'Activo',
                telefono: 4169876543,
                
            },
            {
                id: 7,
                codAbonado: 55667,
                nombre: 'Consultores Asociados',
                correo: 'consultores@asociados.biz',
                tipoCliente: 'Empresa',
                documento: 'J-44556677-8',
                fechaRegistro: '2024-07-01',
                fechaActivacion: '2024-07-08',
                status: 'Activo',
                telefono: 2123334455,
                
            },
            {
                id: 8,
                codAbonado: 77889,
                nombre: 'Ricardo Gómez',
                correo: 'ricardo.gomez@provider.net',
                tipoCliente: 'Persona Natural',
                documento: 'V-10987654',
                fechaRegistro: '2024-08-15',
                fechaActivacion: '2024-08-22',
                status: 'Activo',
                telefono: 4128899001,
                
            },
            {
                id: 9,
                codAbonado: 99001,
                nombre: 'Soluciones Tecnológicas',
                correo: 'soluciones@tecnologicas.org',
                tipoCliente: 'Empresa',
                documento: 'J-88990011-2',
                fechaRegistro: '2024-09-01',
                fechaActivacion: '2024-09-07',
                status: 'Inactivo',
                telefono: 2126667788,
                
            },
            {
                id: 10,
                codAbonado: 22334,
                nombre: 'Elena Vargas',
                correo: 'elena.vargas@service.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-23456789',
                fechaRegistro: '2024-10-10',
                fechaActivacion: '2024-10-15',
                status: 'Activo',
                telefono: 4145556677,
                
            },
        ],
        page: 1,
        pageCount: 2,
        itemsPerPage: 10,
        activeUsers: 8,
        inactiveUsers: 2,
        totalUsers: 10,
    };

    return res.json(data)
})





http://localhost:4000/clientes/reporteClientes?loginUsuario=test&codPagina=1&tipoCliente=C&codEstatus=
app.get('/clientes/reporteClientes', (req, res) => {
    const { loginUsuario, codPagina, tipoCliente, codEstatus } = req.query;

    // Simulate a database query based on the parameters
    const data = {
        data: [
            {
                id: 1,
                codAbonado: 12345,
                nombre: 'Electrodomésticos S.A.',
                correo: 'info@electrodomesticos.com',
                tipoCliente: 'Empresa',
                documento: 'J-12345678-9',
                fechaRegistro: '2024-01-15',
                fechaActivacion: '2024-01-20',
                status: 'Activo',
                telefono: 2125551122,
                
            },
            {
                id: 2,
                codAbonado: 67890,
                nombre: 'María Rodríguez',
                correo: 'maria.rodriguez@example.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-9876543',
                fechaRegistro: '2024-02-01',
                fechaActivacion: '2024-02-05',
                status: 'Inactivo',
                telefono: 4141234567,
                
            },
            {
                id: 3,
                codAbonado: 13579,
                nombre: 'Servicios Integrales C.A.',
                correo: 'servicios@integrales.net',
                tipoCliente: 'Empresa',
                documento: 'J-98765432-1',
                fechaRegistro: '2024-03-10',
                fechaActivacion: '2024-03-15',
                status: 'Activo',
                telefono: 2129998877,
                
            },
            {
                id: 4,
                codAbonado: 24680,
                nombre: 'Pedro Pérez',
                correo: 'pedro.perez@domain.org',
                tipoCliente: 'Persona Natural',
                documento: 'E-1234567',
                fechaRegistro: '2024-04-01',
                fechaActivacion: '2024-04-07',
                status: 'Activo',
                telefono: 4241122334,
                
            },
            {
                id: 5,
                codAbonado: 11223,
                nombre: 'Inversiones Globales',
                correo: 'inversiones@globales.com.ve',
                tipoCliente: 'Empresa',
                documento: 'J-00112233-4',
                fechaRegistro: '2024-05-05',
                fechaActivacion: '2024-05-10',
                status: 'Inactivo',
                telefono: 2127776655,
                
            },
            {
                id: 6,
                codAbonado: 33445,
                nombre: 'Luisa Fernández',
                correo: 'luisa.fernandez@email.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-5432109',
                fechaRegistro: '2024-06-12',
                fechaActivacion: '2024-06-18',
                status: 'Activo',
                telefono: 4169876543,
                
            },
            {
                id: 7,
                codAbonado: 55667,
                nombre: 'Consultores Asociados',
                correo: 'consultores@asociados.biz',
                tipoCliente: 'Empresa',
                documento: 'J-44556677-8',
                fechaRegistro: '2024-07-01',
                fechaActivacion: '2024-07-08',
                status: 'Activo',
                telefono: 2123334455,
                
            },
            {
                id: 8,
                codAbonado: 77889,
                nombre: 'Ricardo Gómez',
                correo: 'ricardo.gomez@provider.net',
                tipoCliente: 'Persona Natural',
                documento: 'V-10987654',
                fechaRegistro: '2024-08-15',
                fechaActivacion: '2024-08-22',
                status: 'Activo',
                telefono: 4128899001,
                
            },
            {
                id: 9,
                codAbonado: 99001,
                nombre: 'Soluciones Tecnológicas',
                correo: 'soluciones@tecnologicas.org',
                tipoCliente: 'Empresa',
                documento: 'J-88990011-2',
                fechaRegistro: '2024-09-01',
                fechaActivacion: '2024-09-07',
                status: 'Inactivo',
                telefono: 2126667788,
                
            },
            {
                id: 10,
                codAbonado: 22334,
                nombre: 'Elena Vargas',
                correo: 'elena.vargas@service.com',
                tipoCliente: 'Persona Natural',
                documento: 'V-23456789',
                fechaRegistro: '2024-10-10',
                fechaActivacion: '2024-10-15',
                status: 'Activo',
                telefono: 4145556677,
                
            },
        ],
        page: 1,
        pageCount: 2,
        itemsPerPage: 10,
        activeUsers: 8,
        inactiveUsers: 2,
        totalUsers: 10,
    };

    return res.json(data)
})


http://localhost:4000/clientes/reporteOperaciones?loginUsuario=test&codPagina=1&fIniOperacion=2025-04-21&fFinOperacion=2025-04-21&tipoModificacion=&tipoCliente=3&nombreUsuario=
app.get('/clientes/reporteOperaciones', (req, res) => {
    const data = {
        data: [
         
              {
                id: 1,
                codAbonado: 12345,
                nombre: 'Ana Bravo',
                fechaOperacion: '15-01-2024',
                tipoModificacion: 'modifica',
                cantOperaciones: 5,
                tipoCliente: 'finanzas',
              },
              {
                id: 2,
                codAbonado: 67890,
                nombre: 'Carlos Pérez',
                fechaOperacion: '20-02-2024',
                tipoModificacion: 'edita',
                cantOperaciones: 12,
                tipoCliente: 'admin',
              },
              {
                id: 3,
                codAbonado: 11223,
                nombre: 'Sofía Gómez',
                fechaOperacion: '05-03-2024',
                tipoModificacion: 'modifica',
                cantOperaciones: 8,
                tipoCliente: 'tecnologia',
              },
              {
                id: 4,
                codAbonado: 44556,
                nombre: 'Javier López',
                fechaOperacion: '10-03-2024',
                tipoModificacion: 'edita',
                cantOperaciones: 3,
                tipoCliente: 'finanzas',
              },
              {
                id: 5,
                codAbonado: 77889,
                nombre: 'Isabela Rodríguez',
                fechaOperacion: '25-03-2024',
                tipoModificacion: 'modifica',
                cantOperaciones: 15,
                tipoCliente: 'admin',
              },
              {
                id: 6,
                codAbonado: 99001,
                nombre: 'Mateo Vargas',
                fechaOperacion: '01-04-2024',
                tipoModificacion: 'edita',
                cantOperaciones: 7,
                tipoCliente: 'tecnologia',
              },
              {
                id: 7,
                codAbonado: 22334,
                nombre: 'Valentina Díaz',
                fechaOperacion: '12-04-2024',
                tipoModificacion: 'modifica',
                cantOperaciones: 9,
                tipoCliente: 'finanzas',
              },
              {
                id: 8,
                codAbonado: 55667,
                nombre: 'Sebastián Ruiz',
                fechaOperacion: '18-04-2024',
                tipoModificacion: 'edita',
                cantOperaciones: 4,
                tipoCliente: 'admin',
              },
              {
                id: 9,
                codAbonado: 88990,
                nombre: 'Lucía Flores',
                fechaOperacion: '28-04-2024',
                tipoModificacion: 'modifica',
                cantOperaciones: 11,
                tipoCliente: 'tecnologia',
              },
              {
                id: 10,
                codAbonado: 33445,
                nombre: 'Gabriel Castro',
                fechaOperacion: '03-05-2024',
                tipoModificacion: 'edita',
                cantOperaciones: 6,
                tipoCliente: 'finanzas',
              },
        ],
        page: 1,
        pageCount: 2,
        itemsPerPage: 10,
        total: 8,
        totalResidencial: 2,
        totalCorporativo: 10,
        totalOpActCorreo: 10,
        totalOpActEstatus: 10,
        totalOpActClave:15,
    };

    return res.json(data)
})


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
