const express = require('express');
const bodyParser = require('body-parser'); // body-parser, middleware para receber o json no body da requisição

const path = require('path');
var cors = require('cors')
const fs = require('fs');
let router = express.Router();
// const padRouter = require('./src/router/pad') // requer a rota

let app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true})); 

router.post('/:pad', (req, res) => {
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

router.get('/:pad', (req, res) => {
    const { params } = req;

    if (!params.pad) {
        res.send();
    }

    const defaultContent = {
        content: '',
        author: null,
        lastIp: null,
        updatedAt: new Date().toISOString()
    }

    try {
        res.send(JSON.parse(fs.readFileSync(`./public/pads/${params.pad}.json`, 'utf8')));
    } catch(e) {
        fs.writeFile(`./public/pads/${req.params.pad}.json`, JSON.stringify(defaultContent), (err) => {
            if (!err) {
                res.send(defaultContent);
            }else{
                res.send(err)
            }
        });
    }
})


app.use('/', router); // Usa a rota

app.listen(8081);