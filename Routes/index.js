const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Rota do Get inicial OK...');
});

module.exports = router;