const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Funcoes auxiliares
const createUserToken = ((userId) => {
    return jwt.sign({ id: userId }, 'batata', { expiresIn: '7d' })
});

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch (err) {
        res.status(200).send(err);
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send('Dados nao inseridos...');
    try {
        const user = await User.findOne({ email });
        if (user) return res.send('Usuario ja criado na base de dados...');

        const userCreate = await User.create(req.body);
        res.status(201).json({userCreate, token: createUserToken(userCreate.id)});

    } catch (err) {
        return res.send('Houve algum erro ao criar o usuario' + err);
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send('Dados nao inseridos...');
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.send('Usuario nao registrado na base de dados...');
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) return res.send('Usuario nao autenticado...');
        res.send({user, token: createUserToken(user.id)});
    } catch (err) {
        res.status(500).send('Houve algum erro ao autenticar o usuario' + err);
    }
});

module.exports = router;