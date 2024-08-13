const {
    body,
    validationResult
} = require('express-validator');

const transaccionValidationRules = () => {
    return [
        body('fecha').notEmpty().withMessage("El campo es obligatorio").isString().withMessage("Debe tener el orden año-mes-dia"),
        body('tipotransaccionid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('formapago').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('fechavencimiento').notEmpty().withMessage("El campo es obligatorio").isString().withMessage("Debe tener el orden año-mes-dia"),
        body('sucursalid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('terceroid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('nombretercero').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('rtn').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('bodegaorigen').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('bodegadestino').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        //body('asientoid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        //body('centrocostosid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('referenciainterna').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('referenciaexterna').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('nota1').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('nota3').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('nota3').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('direccion').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('observaciones').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        // body('tipocambio').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
        //     max: 255
        // }).withMessage('Debe tener menos de 255 caracteres'),
        // body('cambiodolar').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('vendedorid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        // body('estado').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
        //     max: 255
        // }).withMessage('Debe tener menos de 255 caracteres'),
        // body('sucursaldocumentoid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('teleono').isString().withMessage("El campo debe ser de tipo alfanumérico").notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        
        body('contacto').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('registroexonerados').isString().withMessage("El campo debe ser de tipo alfanumérico").optional().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('ordencompraexenta').isString().withMessage("El campo debe ser de tipo alfanumérico").optional().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('regisrosag').isString().withMessage("El campo debe ser de tipo alfanumérico").optional().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('esexonerado').notEmpty().withMessage("El campo es obligatorio").isBoolean().withMessage('Debe ser un valor boleano'),
        body('descuento').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('subtotalexonerado').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('subtotalexento').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('subtotalgravado15').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('subtotalgravado18').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('isv15').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('isv18').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('totalneto').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        // body('cajaid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('banco').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('tipotercero').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        // body('documentobanco').optional().isDecimal().withMessage("Debe ser un numero decimal"),
        body('conductorid').optional().isInt().withMessage("Debe ser un numero entero"),
        body('vehiculoid').optional().isInt().withMessage("Debe ser un numero entero"),
        body('transportista').optional().isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log('errors', errors);
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    transaccionValidationRules, validate,
}