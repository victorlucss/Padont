const express = require('express');
const bodyParser = require('body-parser'); // body-parser, middleware para receber o json no body da requisição

const path = require('path');
var cors = require('cors')
const fs = require('fs');
let router = express.Router();
// const padRouter = require('./src/router/pad') // requer a rota

let app = express();
app.use(cors());
app.use(express.json());

router.put('/api/:pad', (req, res) => {
    const { params } = req;
    console.log(`Updating/creating ${params.pad}`)
    fs.writeFile(`./public/pads/${params.pad}.json`, JSON.stringify(req.body), (err) => {
        if (!err) {
            res.send(req.body);
        }else{
            res.send(err)
        }
    });
});

router.get('/api/:pad', (req, res) => {
    const { params } = req;
    console.log(`Returning/creating ${params.pad}`)

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
                res.status(201).send(defaultContent);
            }else{
                res.send(err)
            }
        });
    }
})


app.use('/', router);

app.listen(8081);
console.log('Listening on port 8081');
