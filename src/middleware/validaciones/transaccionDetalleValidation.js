const {
    body,
    validationResult
} = require('express-validator');

const transaccionDetalleValidationRules = () => {
    return [
        body('transaccionid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('fechadetalle').notEmpty().withMessage("El campo es obligatorio").isString().withMessage("Debe tener el orden año-mes-dia"),
        body('inventarioid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('inventariodescripcion').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('precio').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('preciodescuento').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('costo').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('costodescuento').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('cantidad').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('cantidadmovida').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('cantidadpendiente').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('impuesto').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('impuestomonto').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('descuento').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('descuentomonto').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('bodegaid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('monto').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('vendedorid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('unidadid').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
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
        message: extractedErrors,
    })
}

module.exports = {
    transaccionDetalleValidationRules, validate,
}