'use strict';
const express = require('express');
const mainController = require('./controllers/mainController');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static-files'));

mainController(app);

app.listen(1300, () => {
    console.log('Now live at 1300');
});
