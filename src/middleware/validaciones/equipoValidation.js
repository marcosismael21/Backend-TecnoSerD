const {
    body,
    validationResult
} = require('express-validator');

const equipoValidationRules=()=>{
    return [
        body('idTipoEquipo').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('noserie').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('noimei').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('pin').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('puk').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('fechaLlegada').notEmpty().withMessage("El campo es obligatorio").isISO8601().withMessage('La fecha debe estar en formato ISO8601 (YYYY-MM-DD)').toDate(),
        body('comodin').notEmpty().withMessage("El campo es obligatorio").isBoolean().withMessage('Debe ser un valor boleano'),
        body('estado').notEmpty().withMessage("El campo es obligatorio").isBoolean().withMessage('Debe ser un valor boleano')
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log('errors',errors);
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
    equipoValidationRules,
    validate,
}