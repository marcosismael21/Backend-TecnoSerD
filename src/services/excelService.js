const xlsx = require('xlsx');
const excelRepository = require('../repositories/excelRepository');
const db = require('../models');
const Ciudad = db.Ciudad;
const TipoComercio = db.TipoComercio;
const TipoEquipo = db.TipoEquipo;
const Proveedor = db.Proveedor;
const Equipo = db.Equipo;

// Función para importar datos desde un buffer Excel y guardarlos en la base de datos
const importExcelData = async (buffer) => {
    try {
        // Leer el archivo Excel desde el buffer
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(sheet);

        for (let row of excelData) {
            // Buscar la ciudad en la base de datos por nombre y estado activo
            const ciudad = await Ciudad.findOne({
                where: {
                    nombre: row['CIUDAD'], // Buscar por 'nombre' en Ciudad
                    estado: 1              // Solo ciudades activas
                }
            });

            // Buscar el tipo de comercio en la base de datos por nombre y estado activo
            const tipoComercio = await TipoComercio.findOne({
                where: {
                    nombre: row['Tipo de Comercio'], // Buscar por 'nombre' en TipoComercio
                    //estado: 1                        // Solo tipos de comercio activos
                }
            });

            // Asignar 0 en caso de que numTienda o numUsuario sean null, undefined o vacíos
            const numTienda = row['ID TIENDA'] ? row['ID TIENDA'] : 0;
            const numUsuario = row['USUARIO'] ? row['USUARIO'] : 0;

            // Verificar si el comercio ya existe, utilizando el 'rtn' o 'numTienda'
            const comercioExistente = await excelRepository.getComercioExistente(row['RTN'], row['Nombre de Comercio']);

            if (!comercioExistente) {
                // Crear el objeto Comercio con los datos del Excel
                const comercioData = {
                    nombreComercio: row['Nombre de Comercio'],
                    rtn: row['RTN'],
                    direccion: row['DIRECCIÓN'],
                    numTienda: numTienda,
                    nombreContacto: row['NOMBRE DE CONTACTO'],
                    telefono: row['TELÉFONO'],
                    numUsuario: numUsuario,
                    idCiudad: ciudad ? ciudad.id : null,    // Asegurar ciudad válida
                    longitud: row['Lonjitud'],               // Invertido latitud/longitud
                    latitud: row['Latitud'],
                    idTipoComercio: tipoComercio ? tipoComercio.id : null  // Asegurar tipo de comercio válido
                };

                // Guardar el comercio en la base de datos
                await excelRepository.createComercio(comercioData);
            }
        }
    } catch (error) {
        throw error;
    }
};

const importEquiposExcelData = async (buffer) => {
    try {
        // Leer el archivo Excel desde el buffer
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(sheet);

        const fechaActual = new Date(); // Fecha de llegada actual

        for (let row of excelData) {
            const canal = row['CANAL'];  // Proveedor
            const proveedor = await Proveedor.findOne({
                where: {
                    nombre: canal,
                    estado: 1 // Solo proveedores activos
                }
            });

            if (!proveedor) {
                throw new Error(`Proveedor no encontrado para el canal: ${canal}`);
            }

            // Para cada fila, primero registramos el D2 Mini (si existe)
            let tipoTerminal = row['TIPO DE TERMINAL'] ? row['TIPO DE TERMINAL'].toUpperCase() : ''; // Convertimos a mayúsculas
            tipoTerminal = tipoTerminal.includes('SUNMI') ? tipoTerminal.replace('SUNMI ', '') : tipoTerminal;

            if (tipoTerminal === 'D2 MINI') {
                const d2MiniSerie = row['SN']; // Buscar número de serie D2 Mini
                const d2MiniIMEI = row['IMEI'];     // Buscar IMEI del D2 Mini

                if (d2MiniSerie && d2MiniIMEI) {
                    const tipoEquipoD2Mini = await TipoEquipo.findOne({
                        where: {
                            nombre: 'd2 mini',  // Aseguramos la consistencia del nombre
                            idProveedor: proveedor.id,
                            estado: 1
                        }
                    });

                    if (!tipoEquipoD2Mini) {
                        throw new Error(`Tipo de equipo D2 Mini no encontrado para el proveedor: ${proveedor.nombre}`);
                    }

                    // Verificar si el equipo ya existe
                    const equipoExistenteD2Mini = await excelRepository.getEquipoByNoSerie(d2MiniSerie);
                    if (equipoExistenteD2Mini) {
                        console.log(`D2 Mini con número de serie ${d2MiniSerie} ya existe, omitiendo...`);
                    } else {
                        // Guardar D2 Mini en la base de datos
                        const equipoD2Mini = {
                            idTipoEquipo: tipoEquipoD2Mini.id,
                            noserie: d2MiniSerie,
                            noimei: d2MiniIMEI,    // IMEI para D2 Mini
                            pin: 0,                // PIN es 0
                            puk: 0,                // PUK es 0
                            fechaLlegada: fechaActual,
                            comodin: false,
                            estado: true
                        };
                        await excelRepository.createEquipo(equipoD2Mini);
                    }
                }
            }

            // Ahora vamos a registrar los demás tipos de equipos que solo requieren numSerie
            const tiposDeEquipo = [
                { nombre: 'QPOS', columna: 'QPOS' },
                { nombre: 'Power Bank', columna: 'Power Bank SN' },
                { nombre: 'Scanner', columna: 'SCANNER' },
                { nombre: 'Lectora', columna: 'Lectora S/N' }
            ];

            for (let tipo of tiposDeEquipo) {
                const noserie = row[tipo.columna];  // Buscar número de serie

                if (noserie) {
                    const tipoEquipo = await TipoEquipo.findOne({
                        where: {
                            nombre: tipo.nombre.toLowerCase(),
                            idProveedor: proveedor.id,
                            estado: 1
                        }
                    });

                    if (!tipoEquipo) {
                        throw new Error(`Tipo de equipo ${tipo.nombre} no encontrado para el proveedor: ${proveedor.nombre}`);
                    }

                    // Verificar si el equipo ya existe
                    const equipoExistente = await excelRepository.getEquipoByNoSerie(noserie);
                    if (equipoExistente) {
                        console.log(`Equipo con número de serie ${noserie} ya existe, omitiendo...`);
                        continue;
                    }

                    // Crear y guardar el equipo con solo número de serie
                    const equipoData = {
                        idTipoEquipo: tipoEquipo.id,
                        noserie: noserie,
                        noimei: 0,          // No tiene IMEI
                        pin: 0,             // PIN es 0
                        puk: 0,             // PUK es 0
                        fechaLlegada: fechaActual,
                        comodin: false,
                        estado: true
                    };

                    await excelRepository.createEquipo(equipoData);
                }
            }

            // Registro de chips basado en la compañía (TIGO o CLARO)
            const compania = row['Compañía'] ? row['Compañía'].toUpperCase() : ''; // Convertimos a mayúsculas
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

                if (!tipoEquipoChip) {
                    throw new Error(`Tipo de equipo ${nombreChip} no encontrado`);
                }

                // Verificar si el chip ya existe por algún criterio que consideres importante (como PIN/PUK)
                // Si no existe, creamos el nuevo chip
                const equipoChip = {
                    idTipoEquipo: tipoEquipoChip.id,
                    noserie: 0,       // No tiene número de serie
                    noimei: 0,        // No tiene IMEI
                    pin: pin,
                    puk: puk,
                    fechaLlegada: fechaActual,
                    comodin: false,
                    estado: true
                };

                await excelRepository.createEquipo(equipoChip);
            }
        }
    } catch (error) {
        throw error;
    }
};

const importExcelDataUnificado = async (buffer) => {
    try {
        // Leer el archivo Excel desde el buffer
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(sheet);

        const fechaActual = new Date(); // Fecha de llegada actual

        for (let row of excelData) {
            // Buscar la ciudad en la base de datos
            const ciudad = await Ciudad.findOne({
                where: {
                    nombre: row['CIUDAD'],
                    estado: 1
                }
            });

            // Buscar el tipo de comercio en la base de datos
            const tipoComercio = await TipoComercio.findOne({
                where: {
                    nombre: row['Tipo de Comercio'],
                    estado: 1
                }
            });

            const numTienda = row['ID TIENDA'] ? row['ID TIENDA'] : 0;
            const numUsuario = row['USUARIO'] ? row['USUARIO'] : 0;

            // Buscar el proveedor
            const proveedor = await Proveedor.findOne({
                where: {
                    nombre: row['CANAL'],
                    estado: 1
                }
            });

            if (!proveedor) {
                throw new Error(`Proveedor no encontrado para el canal: ${row['CANAL']}`);
            }

            // Crear el objeto comercio
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

            // Preparar los equipos
            const equipos = [];

            // Registro D2 Mini
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

            // Otros equipos
            const tiposDeEquipo = [
                { nombre: 'QPOS', columna: 'QPOS' },
                { nombre: 'Power Bank', columna: 'Power Bank SN' },
                { nombre: 'Scanner', columna: 'SCANNER' },
                { nombre: 'Lectora', columna: 'Lectora S/N' }
            ];

            for (let tipo of tiposDeEquipo) {
                const noserie = row[tipo.columna];
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
                        noserie: noserie,
                        noimei: 0,
                        pin: 0,
                        puk: 0,
                        fechaLlegada: fechaActual,
                        comodin: false,
                        estado: true
                    });
                }
            }

            // Registro de chips
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

            // Llamar a la función que crea el comercio con los equipos y la asignación
            await excelRepository.createComercioConEquiposYAsignacion(comercioData, equipos);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    importExcelData,
    importEquiposExcelData,
    importExcelDataUnificado
};