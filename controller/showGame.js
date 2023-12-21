const express = require('express');
const router = express.Router();

router.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const game = getGameById(id);
    if (!game) {
        return res.status(404).json({ error: 'Game not found.' });
    }
    res.status(200).json(game);
  });
  