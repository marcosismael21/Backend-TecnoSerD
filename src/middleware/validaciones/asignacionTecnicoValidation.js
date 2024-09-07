const {
    body,
    validationResult
} = require('express-validator');

const asignacionTecnicoValidationRules=()=>{
    return [
        body('idUsuario').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('idAsignacion').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('idEstado').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero")
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
        errors: extractedErrors,
    })
}

module.exports = {
    asignacionTecnicoValidationRules,
    validate,
}