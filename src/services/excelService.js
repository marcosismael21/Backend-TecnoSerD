const xlsx = require('xlsx');
const excelRepository = require('../repositories/excelRepository');
const db = require('../models');
const Ciudad = db.Ciudad;
const TipoComercio = db.TipoComercio;
const TipoEquipo = db.TipoEquipo;
const Proveedor = db.Proveedor;
const Servicio = db.Servicio;

const importExcelDataUnificado = async (buffer) => {
    try {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData =  xlsx.utils.sheet_to_json(sheet, { raw: false, defval: '' });

        const fechaActual = new Date(); // Fecha de llegada actual
        const processedComercios = {}; // Para rastrear comercios y servicios procesados

        for (let row of excelData) {
            // Buscar la ciudad en la base de datos por nombre y estado activo
            const ciudad = await Ciudad.findOne({
                where: {
                    nombre: row['CIUDAD'].trim(), // Añadir trim() para eliminar espacios y Buscar por 'nombre' en Ciudad
                    estado: 1 // Solo ciudades activas
                }
            });

            // Buscar el tipo de comercio en la base de datos por nombre y estado activo
            const tipoComercio = await TipoComercio.findOne({
                where: {
                    nombre: row['Tipo de Comercio'], // Buscar por 'nombre' en TipoComercio
                    estado: 1  // Solo tipos de comercio activos
                }
            });

            const numTienda = row['ID TIENDA'] ? row['ID TIENDA'] : 0;
            const numUsuario = row['USUARIO'] ? row['USUARIO'] : 0;

            const proveedor = await Proveedor.findOne({
                where: {
                    nombre: row['CANAL'],
                    estado: 1
                }
            });

            if (!proveedor) {
                throw new Error(`Proveedor no encontrado para el canal: ${row['CANAL']}`);
            }

            const comercioData = {
                nombreComercio: row['Nombre de Comercio'],
                rtn: row['RTN'],
                direccion: row['DIRECCIÓN'],
                numTienda: numTienda,
                nombreContacto: row['NOMBRE DE CONTACTO'],
                telefono: row['TELÉFONO'],
                numUsuario: numUsuario,
                idCiudad: ciudad ? ciudad.id : null,
                longitud: row['Lonjitud'],
                latitud: row['Latitud'],
                idTipoComercio: tipoComercio ? tipoComercio.id : null
            };

            const equipos = [];
            let tipoTerminal = row['TIPO DE TERMINAL'] ? row['TIPO DE TERMINAL'].toUpperCase() : '';
            tipoTerminal = tipoTerminal.includes('SUNMI') ? tipoTerminal.replace('SUNMI ', '') : tipoTerminal;

            if (tipoTerminal === 'D2 MINI' && row['SN'] && row['IMEI']) {
                const tipoEquipoD2Mini = await TipoEquipo.findOne({
                    where: {
                        nombre: 'd2 mini',
                        idProveedor: proveedor.id,
                        estado: 1
                    }
                });

                equipos.push({
                    idTipoEquipo: tipoEquipoD2Mini.id,
                    noserie: row['SN'],
                    noimei: row['IMEI'],
                    pin: 0,
                    puk: 0,
                    fechaLlegada: fechaActual,
                    comodin: false,
                    estado: true
                });
            }

            const tiposDeEquipo = [
                { nombre: 'QPOS', columna: 'QPOS' },
                { nombre: 'Power Bank', columna: 'Power Bank SN' },
                { nombre: 'Scanner', columna: 'SCANNER' },
                { nombre: 'Lectora', columna: 'Lectora S/N' },
                { nombre: 'TOKEN', columna: 'TOKEN' },
            ];

            for (let tipo of tiposDeEquipo) {
                const noserie = row[tipo.columna] ? String(row[tipo.columna]) : '';
                if (noserie) {
                    const tipoEquipo = await TipoEquipo.findOne({
                        where: {
                            nombre: tipo.nombre.toLowerCase(),
                            idProveedor: proveedor.id,
                            estado: 1
                        }
                    });

                    equipos.push({
                        idTipoEquipo: tipoEquipo.id,
                        noserie: String(noserie),
                        noimei: 0,
                        pin: 0,
                        puk: 0,
                        fechaLlegada: fechaActual,
                        comodin: false,
                        estado: true
                    });
                }
            }

            const compania = row['Compañía'] ? row['Compañía'].toUpperCase() : '';
            const pin = row['PIN'] || 0;
            const puk = row['PUK'] || 0;

            if (compania === 'TIGO' || compania === 'CLARO') {
                const nombreChip = compania === 'TIGO' ? 'chip tigo' : 'chip claro';
                const tipoEquipoChip = await TipoEquipo.findOne({
                    where: {
                        nombre: nombreChip,
                        estado: 1
                    }
                });

                equipos.push({
                    idTipoEquipo: tipoEquipoChip.id,
                    noserie: 0,
                    noimei: 0,
                    pin: pin,
                    puk: puk,
                    fechaLlegada: fechaActual,
                    comodin: false,
                    estado: true
                });
            }

            // Extraer idServicio desde "Tipo de Gestion" y "CANAL"
            const servicio = await Servicio.findOne({
                where: {
                    nombre: row['Tipo de Gestion'],
                    idcanal: proveedor.id, // Relacionamos con el proveedor encontrado
                    estado: 1
                }
            });

            if (!servicio) {
                throw new Error('Tipo de Problema o Servicio no encontrados en el archivo Excel.');
            }

            const TipoProblemaData = row['Tipo de Problema'] ? row['Tipo de Problema'] : '';

            // Verificar si el comercio ya ha sido procesado con el mismo servicio
            const comercioKey = `${comercioData.nombreComercio}-${servicio.id}`;
            console.log(`Processing comercioKey: ${comercioKey}`); // Debugging line
            if (processedComercios[comercioKey]) {
                // Marcar equipos como comodines
                equipos.forEach(equipo => equipo.comodin = 1);
                await excelRepository.createEquipos(equipos)
            } else {
                // Marcar el comercio como procesado con este servicio
                processedComercios[comercioKey] = true;
                console.log(`Marking comercio as processed: ${comercioKey}`); // Debugging line

                // Verificar si el comercio ya existe en la base de datos
                let comercioId = await excelRepository.getComercioExistente(comercioData.rtn, comercioData.nombreComercio);
                if (!comercioId) {
                    // Crear el comercio si no existe
                    await excelRepository.createComercioConEquiposYAsignacion(comercioData, equipos, TipoProblemaData, servicio.id);
                } else {
                    // Asignar equipos al comercio existente
                    await excelRepository.createComercioConEquiposYAsignacionById(comercioId.id, equipos, TipoProblemaData, servicio.id);
                }
            }
        }
    } catch (error) {
        console.error(error); // Debugging line
        throw error;
    }
};

module.exports = {
    importExcelDataUnificado
};