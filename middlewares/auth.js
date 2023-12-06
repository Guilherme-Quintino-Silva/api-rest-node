const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if (!token_header) return res.send('Autenticacao recusada...');

    jwt.verify(token_header, 'batata', (err, decoded) => {
        if (err) return res.send('Token invalido');
        return next();
    })
}

module.exports = auth;