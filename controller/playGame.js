const express = require('express');
const router = express.Router();
const { validateWord, checkWordInDictionary } = require('./validateWord.js');
const { getGameById, updateGamePoints } = require('../db/db.js')

router.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { token, word } = req.body;

    const game = getGameById(id);
    if (!game || game.token !== token) {
        return res.status(404).json({ error: 'Game not found or invalid token.' });
    }
    let board = game.board;
    if(!validateWord(word, board) || !checkWordInDictionary(word)) {
        res.status(500).json({error : 'Not a correct/valid word'});
    }
    else {
        game.points++;
        updateGamePoints(id, game.points);
    }
  res.status(200);
});

module.exports = router;