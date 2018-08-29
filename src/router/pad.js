const express = require('express');
const firebase = require('firebase');
const config = require('../config/firebase.config'); // arquivo com exportação de configurações do firebase
const path = require('path');

firebase.initializeApp(config.firebase);

let router = express.Router(); // criação de rota da nota

router.get('/', (req,res) => {
    res.sendFile(path.resolve('./src/html/inicio.html')); 
})

router.get('/:pad', (req,res) => {
    res.sendFile(path.resolve('./src/html/pad.html'));
})

router.post('/send/:pad', (req,res) => {
    firebase.database().ref('pads').child(req.params.pad).set({
        text: req.body.text
    })
    res.send('deubom');
});

router.get('/recovery/:pad', (req,res) => {
    firebase.database().ref('pads').child(req.params.pad).once('value', snapshot => {
        if(snapshot.val()) res.send({text: snapshot.val().text})
    });
})

module.exports = router;

// Remover ../Dontpad/ caso rodar em um servidor interno da pasta