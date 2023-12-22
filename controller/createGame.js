const express = require('express');
const router = express.Router();
const { generateRandomBoard } = require('./generateBoard.js');
const { saveGame } = require('../db/db.js');

router.post('/games', (req, res) => {
    const { duration, random, board } = req.body;
    console.log(duration);
    if (duration === undefined || random === undefined) {
        return res.status(400).json({ error: 'Duration and random are required parameters.' });
    }
    let gameBoard;
    if (random === true) {
        gameBoard = generateRandomBoard(); 
    } else if (board !== undefined) {
        gameBoard = board;
    } 
    // save game in db
    saveGame(random, duration, gameBoard); // assuming gameBoard is the correct board to save
    res.status(201).json({ board: gameBoard, duration: duration });
});

module.exports = router;
