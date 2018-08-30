const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router(); // Criação de rota da nota

const PROCESS = 'prod';
const CLOUD =  (PROCESS === 'prod') ? '../Dontpad/' : './';


router.get('/', (req,res) => {
    res.sendFile(path.resolve(`${CLOUD}src/html/inicio.html`)); 
})

router.get('/:pad', (req,res) => {
    res.sendFile(path.resolve(`${CLOUD}src/html/pad.html`));
})

router.post('/send/:pad', (req,res) => {
    let json = {
        text: req.body.text
    }

    json = JSON.stringify(json);

    fs.writeFile(`${CLOUD}src/pads/${req.params.pad}.json`, json, (err) => {
        if (!err) {
            res.send('deubom');
        }else{
            res.send(err)
        }
    });
});

router.get('/recovery/:pad', (req,res) => {
    try {
        res.send(JSON.parse(fs.readFileSync(`${CLOUD}src/pads/${req.params.pad}.json`, 'utf8')));
    } catch(e) {
        fs.writeFile(`${CLOUD}src/pads/${req.params.pad}.json`, JSON.stringify({ text: ''}), (err) => {
            if (!err) {
                res.send('deubom');
            }else{
                res.send(err)
            }
        });
    }
})

module.exports = router;

// Remover ../Dontpad/ caso rodar em um servidor interno da pasta