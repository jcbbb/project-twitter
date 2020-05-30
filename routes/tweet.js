const { Router } = require('express');
const Tweet = require('../models/Tweet');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.post('/tweet/create', verifyToken, async (req, res) => {
    try {
        const { tweet, userId } = req.body;
    } catch (e) {}
});

module.exports = router;
