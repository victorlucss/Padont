const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');

let app = express();
app.use(bodyParser.urlencoded({ extended: true}));

firebase.initializeApp({
    apiKey: "KEY",
    authDomain: "DOMAIN",
    databaseURL: "DBURL",
    projectId: "PJTID",
    storageBucket: "BUCKET",
    messagingSenderId: "MESSENIDNG"
});

var db = firebase.firestore();


app.get('/', function(req,res) {
    res.sendFile(__dirname+'/index.html');
})

app.get('/:pad', (req,res) => {
    firebase.database().ref('pads').child(req.params.pad).once('value', snapshot => {
        if(snapshot.val().text !== null){
            res.sendFile(__dirname+'/pad.html');
        }else {
            res.sendFile(__dirname+'/pad.html');
            // res.sendFile(__dirname+'padRequirePassword.html')
        }
    });
})

app.post('/send/:pad', (req,res) => {
    firebase.database().ref('pads').child(req.params.pad).set({
        text: req.body.text,
        password: null
    })
    res.send('deubom');
});

app.get('/recovery/:pad', (req,res) => {
    firebase.database().ref('pads').child(req.params.pad).once('value', snapshot => {
        if(snapshot.val()) res.send({text: snapshot.val().text})
    });
})

app.listen(5368);