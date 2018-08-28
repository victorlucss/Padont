var subdomain = require('express-subdomain');
var express = require('express');
var app = express();

// *** Code examples below go here! ***

var router = express.Router();

//api specific routes
router.get('/', function(req, res) {
    res.send('Welcome to our API!');
});

router.get('/users', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

app.use(subdomain('stg', router));

// example.com
app.get('/', function(req, res) {
    res.send('Homepage');
});

app.listen(80);