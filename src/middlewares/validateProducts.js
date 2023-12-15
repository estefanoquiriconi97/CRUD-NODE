const  {body} = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('El nombre del producto no debe estar vacio').bail()
    .isLength({min:2}).withMessage('Debe contener como mínimo 2 caracteres'),
    body('price').notEmpty().withMessage('El precio del producto no debe estar vacio').bail()
    .isNumeric().withMessage('El precio debe ser un número'),
    body('discount').notEmpty().withMessage('El precio del producto no puede estar vacio').bail()
    .isNumeric().withMessage('El precio debe ser un número'),
]