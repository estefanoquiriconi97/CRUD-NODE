// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
// router.???('/search', mainController.search); 

router.get('/pruebaSession', (req, res)=>{
    if(req.session.numerovisitas == undefined){
        req.session.numerovisitas = 0;
    }
    req.session.numerovisitas++;
    res.send('Session tiene el número: ' + req.session.numerovisitas)
})


router.get('/mostrarNumeroSession', (req, res)=>{
    res.send('Session tiene el número: ' + req.session.numerovisitas);
})

module.exports = router;
