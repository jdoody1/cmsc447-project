const express = require('express');
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

const con = connector.getConnectorInstance();

app.get('/getData_AL', (request, response) => {
    const result = con.getData_AL();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_AK', (request, response) => {
    const result = con.getData_AK();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_AS', (request, response) => {
    const result = con.getData_AS();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_AZ', (request, response) => {
    const result = con.getData_AZ();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_AR', (request, response) => {
    const result = con.getData_AR();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_CA', (request, response) => {
    const result = con.getData_CA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_CO', (request, response) => {
    const result = con.getData_CO();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_CT', (request, response) => {
    const result = con.getData_CT();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_DE', (request, response) => {
    const result = con.getData_DE();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_DC', (request, response) => {
    const result = con.getData_DC();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_FM', (request, response) => {
    const result = con.getData_FM();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_FL', (request, response) => {
    const result = con.getData_FL();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_GA', (request, response) => {
    const result = con.getData_GA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_GU', (request, response) => {
    const result = con.getData_GU();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_HI', (request, response) => {
    const result = con.getData_HI();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_ID', (request, response) => {
    const result = con.getData_ID();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_IL', (request, response) => {
    const result = con.getData_IL();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_IN', (request, response) => {
    const result = con.getData_IN();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_IA', (request, response) => {
    const result = con.getData_IA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_KS', (request, response) => {
    const result = con.getData_KS();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_KY', (request, response) => {
    const result = con.getData_KY();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_LA', (request, response) => {
    const result = con.getData_LA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_ME', (request, response) => {
    const result = con.getData_ME();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MH', (request, response) => {
    const result = con.getData_MH();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MD', (request, response) => {
    const result = con.getData_MD();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MA', (request, response) => {
    const result = con.getData_MA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MI', (request, response) => {
    const result = con.getData_MI();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MN', (request, response) => {
    const result = con.getData_MN();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MS', (request, response) => {
    const result = con.getData_MS();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MO', (request, response) => {
    const result = con.getData_MO();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MT', (request, response) => {
    const result = con.getData_MT();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NE', (request, response) => {
    const result = con.getData_NE();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NV', (request, response) => {
    const result = con.getData_NV();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NH', (request, response) => {
    const result = con.getData_NH();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NJ', (request, response) => {
    const result = con.getData_NJ();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NM', (request, response) => {
    const result = con.getData_NM();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NY', (request, response) => {
    const result = con.getData_NY();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_NC', (request, response) => {
    const result = con.getData_NC();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_ND', (request, response) => {
    const result = con.getData_ND();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_MP', (request, response) => {
    const result = con.getData_MP();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_OH', (request, response) => {
    const result = con.getData_OH();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_OK', (request, response) => {
    const result = con.getData_OK();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_OR', (request, response) => {
    const result = con.getData_OR();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_PW', (request, response) => {
    const result = con.getData_PW();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_PA', (request, response) => {
    const result = con.getData_PA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_PR', (request, response) => {
    const result = con.getData_PR();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_RI', (request, response) => {
    const result = con.getData_RI();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_SC', (request, response) => {
    const result = con.getData_SC();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_SD', (request, response) => {
    const result = con.getData_SD();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_TN', (request, response) => {
    const result = con.getData_TN();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_TX', (request, response) => {
    const result = con.getData_TX();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_UT', (request, response) => {
    const result = con.getData_UT();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_VT', (request, response) => {
    const result = con.getData_VT();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_VI', (request, response) => {
    const result = con.getData_VI();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_VA', (request, response) => {
    const result = con.getData_VA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_WA', (request, response) => {
    const result = con.getData_WA();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_WV', (request, response) => {
    const result = con.getData_WV();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_WI', (request, response) => {
    const result = con.getData_WI();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

app.get('/getData_WY', (request, response) => {
    const result = con.getData_WY();
    result.then(data => response.json({data : data})).catch(err => console.log(err));
});

module.exports = app;
app.listen(port, () => console.info(`Listening on port ${port}`));
