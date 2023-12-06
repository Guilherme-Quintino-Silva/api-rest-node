const express = require('express');
const app = express();
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv:{dado sensível}@clusterapi.6p2dnmm.mongodb.net/')
    .then(() => {
        console.log('Conectado ao banco de dados...');
    }).catch((error) => {
        console.log('Ops, houve algum erro... ' + error);
    });

app.use(express.json());
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

