const express = require('express');
const path = require('path');
const fs = require('fs');

let router = express.Router(); // criação de rota da nota

router.get('/', (req,res) => {
    res.sendFile(path.resolve('./src/html/inicio.html')); 
})

router.get('/:pad', (req,res) => {
    res.sendFile(path.resolve('./src/html/pad.html'));
})

router.post('/send/:pad', (req,res) => {
    let json = {
        text: req.body.text
    }

    json = JSON.stringify(json);

    fs.writeFile('./src/pads/'+req.params.pad+'.json', json, (err) => {
        if (!err) {
            res.send('deubom');
        }
    });
});

router.get('/recovery/:pad', (req,res) => {
    try {
        res.send(JSON.parse(fs.readFileSync('./src/pads/'+req.params.pad+'.json', 'utf8')));
    } catch(e) {
        fs.writeFile('./src/pads/'+req.params.pad+'.json', JSON.stringify({ text: ''}), (err) => {
            if (!err) {
                res.send('deubom');
            }
        });
    }
})

module.exports = router;

// Remover ../Dontpad/ caso rodar em um servidor interno da pasta