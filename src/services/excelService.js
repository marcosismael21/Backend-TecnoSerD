const xlsx = require('xlsx');
const excelRepository = require('../repositories/excelRepository');
const db = require('../models');
const Ciudad = db.Ciudad;
const TipoComercio = db.TipoComercio;
const TipoEquipo = db.TipoEquipo;
const Proveedor = db.Proveedor;
const Servicio = db.Servicio;

const formatLargeNumber = (value) => {
    if (!value) return '';
    // Convertir a string y eliminar cualquier espacio
    const strValue = value.toString().trim()

    // Si es notación científica
    if (strValue.includes('e')) {
        const [mantissa, exponent] = strValue.split('e');
        const decimalStr = mantissa.replace('.', '');
        const exp = parseInt(exponent);
        let result = decimalStr;
        while (result.length <= exp) {
            result += '0';
        }
        return result
    }

    // Si es un número normal pero tiene decimales
    if (strValue.includes('.')) {
        return strValue.split('.')[0];
    }

    return strValue;
}

const importExcelDataUnificado = async (buffer, interpretaciones = []) => {
    try {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(sheet, { raw: false, defval: '' });

        const fechaActual = new Date();
        const processedComercios = {};

        const getInterpretacion = (index) => {
            const interpretacion = interpretaciones.find(i => i.rowIndex === index + 1);
            return interpretacion ? interpretacion.interpretacion : '';
        };

        for (let [index, row] of excelData.entries()) {
            const ciudad = await Ciudad.findOne({
                where: {
                    nombre: row['CIUDAD'].trim(),
                    estado: 1
                }
            });

            const tipoComercio = await TipoComercio.findOne({
                where: {
                    nombre: row['Tipo de Comercio'],
                    estado: 1
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

                const equipoD2Mini = {
                    idTipoEquipo: tipoEquipoD2Mini.id,
                    noserie: row['SN'],
                    noimei: row['IMEI'],
                    pin: 0,
                    puk: 0,
                    fechaLlegada: fechaActual,
                    comodin: false,
                    estado: true
                };

                const existingEquipo = await excelRepository.getEquiposByDetails(equipoD2Mini);
                if (existingEquipo) {
                    equipoD2Mini.id = existingEquipo.id;
                }
                equipos.push(equipoD2Mini);
            }

            const tiposDeEquipo = [
                { nombre: 'QPOS', columna: 'QPOS' },
                { nombre: 'Power Bank', columna: 'Power Bank SN' },
                { nombre: 'Scanner', columna: 'SCANNER' },
                { nombre: 'Lectora', columna: 'Lectora S/N' },
                { nombre: 'TOKEN', columna: 'TOKEN' },
            ];

            for (let tipo of tiposDeEquipo) {
                const valorOriginal = row[tipo.columna];
                if (valorOriginal) {
                    const tipoEquipo = await TipoEquipo.findOne({
                        where: {
                            nombre: tipo.nombre.toLowerCase(),
                            idProveedor: proveedor.id,
                            estado: 1
                        }
                    });

                    let noserie;
                    if (tipo.nombre === 'QPOS') {
                        noserie = formatLargeNumber(valorOriginal);
                    } else {
                        noserie = String(valorOriginal);
                    }

                    const equipoData = {
                        idTipoEquipo: tipoEquipo.id,
                        noserie: noserie,
                        noimei: 0,
                        pin: 0,
                        puk: 0,
                        fechaLlegada: fechaActual,
                        comodin: false,
                        estado: true
                    };

                    const existingEquipo = await excelRepository.getEquiposByDetails(equipoData);
                    if (existingEquipo) {
                        equipoData.id = existingEquipo.id;
                    }
                    equipos.push(equipoData);
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

                const equipoChip = {
                    idTipoEquipo: tipoEquipoChip.id,
                    noserie: 0,
                    noimei: 0,
                    pin: pin,
                    puk: puk,
                    fechaLlegada: fechaActual,
                    comodin: false,
                    estado: true
                };

                const existingEquipo = await excelRepository.getEquiposByDetails(equipoChip);
                if (existingEquipo) {
                    equipoChip.id = existingEquipo.id;
                }
                equipos.push(equipoChip);
            }

            const servicio = await Servicio.findOne({
                where: {
                    nombre: row['Tipo de Gestion'],
                    idcanal: proveedor.id,
                    estado: 1
                }
            });

            if (!servicio) {
                throw new Error('Tipo de Problema o Servicio no encontrados en el archivo Excel.');
            }

            const TipoProblemaData = row['Tipo de Problema'] ? row['Tipo de Problema'] : '';
            const interpretacionData = getInterpretacion(index);

            const comercioKey = `${comercioData.nombreComercio}-${servicio.id}`;
            if (processedComercios[comercioKey]) {
                equipos.forEach(equipo => equipo.comodin = true);
                for (let equipoData of equipos) {
                    if (!equipoData.id) {
                        await excelRepository.createEquipos([equipoData]);
                    }
                }
            } else {
                processedComercios[comercioKey] = true;
                let comercioId = await excelRepository.getComercioExistente(comercioData.rtn, comercioData.nombreComercio);
                if (!comercioId) {
                    await excelRepository.createComercioConEquiposYAsignacion(
                        comercioData,
                        equipos,
                        TipoProblemaData,
                        servicio.id,
                        interpretacionData
                    );
                } else {
                    await excelRepository.createComercioConEquiposYAsignacionById(
                        comercioId.id,
                        equipos,
                        TipoProblemaData,
                        servicio.id,
                        interpretacionData
                    );
                }
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    importExcelDataUnificado
};