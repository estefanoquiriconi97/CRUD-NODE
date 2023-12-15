const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/login', usersController.login);
router.get('/register', guestMiddleware, (req, res)=>{
    res.render('register');
})

router.post('/login', [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
], usersController.processLogin);

router.get('/check', (req, res)=>{
    if(req.session.usuarioLogueado == undefined){
        res.send('No estás logueado!!');
    }else{
        res.send('El usuario logueado es ' + req.session.usuarioLogueado.email);
    }
})


module.exports = router;