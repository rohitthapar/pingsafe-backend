const uuid = require('uuid');
var mysql = require('mysql2'); 

var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: 'pingsafe',
    port: 3306
  });

var id = 1;
  // getGameById
async function getGameById(id) {
    try {
        const game = await con.promise().query('SELECT * FROM game WHERE id = ?', [id]);
        return game;
    } catch (error) {
        console.error('Error fetching game by ID:', error);
        throw error;
    }
}
  // updateGamePoints
async function updateGamePoints(id, points) {
    try {
        await con.promise().query('UPDATE game SET points = ? WHERE id = ?', [points, id]);
        console.log('Game points updated!');
    } catch (error) {
        console.error('Error updating game points:', error);
        throw error;
    }
}
  // saveGame
async function saveGame(random, duration, board) {
    try {
        id = id+1;
        token = uuid.v4()
        await con.promise().query('INSERT INTO game (id, token, random, duration, board) VALUES (?, ?, ?, ?, ?)', [id, token, random, duration, board]);
        console.log('New game saved!');
    } catch (error) {
        console.error('Error saving game:', error);
        throw error;
    }
}

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = { getGameById, updateGamePoints, saveGame };