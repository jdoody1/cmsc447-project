const express = require('express')
const mysql = require('mysql');
const cors = require('cors'); 
const ejs = require('ejs');
const app = express(); 
const port = 3000;
const connector = require('./connector');

app.use(cors());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (request, response) => {
    response.render('app');
});

app.get('/getData', (request, response) => {
    const con = connector.getConnectorInstance();
    const result = con.getData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

module.exports = app;
app.listen(port, () => console.info(`Listening on port ${port}`))