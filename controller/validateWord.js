const express = require('express');
const router = express.Router();

async function validateWord(inputWord, board){
    var dr = [-1, 0, 1, 0];
    var dc = [0, 1, 0, -1];

    const splitBoard = (board) => {
        const output = [];
        for (let i = 0; i < board.length; i += 4) {
            output.push(board.slice(i, i + 4).split(''));
        }
        return output;
    };
    const dfs = (row, col, gameBoard, inputWord, vis, idx) => {
        vis[row][col] = 1;
        // case 1 : inputWord length over
        if(idx == inputWord.length) return true; 
        for(let i=0;i<4;i++){
            let nrow = row + dr[i];
            let ncol = col + dc[i]; 
            if(nrow < 4 && nrow >= 0 && ncol < 4 && ncol >= 0 && idx < inputWord.length && vis[nrow][ncol] != 1){
                if(gameBoard[nrow][ncol] == '*' || gameBoard[nrow][ncol] == inputWord[idx+1]){
                    if(dfs(nrow, ncol, gameBoard, inputWord, vis, idx)) return true;
                }
            }
        }
        // vis[row][col] = 0;
        return false;

    };
    
    try {
        let gameBoard = splitBoard(board);
        let newWord = inputWord.toUpperCase();
        console.log('Game Board:', gameBoard);
        console.log('New Word:', newWord);
        let firstChar = newWord[0];
        let vis = Array.from({ length: 4 }, () => Array(4).fill(0));
        for(let i=0;i < 4;i++){
            for(let j=0; j < 4;j++){
                if(gameBoard[i][j] == firstChar || gameBoard[i][j] == '*') {
                    if(dfs(i, j, gameBoard, newWord, vis, 1)) return true;
                }
            }
        }
        return false;
    }
    catch (error){
        throw new Error('Failed to validate word')
    }
}

router.post('/validate-word', async (req, res) => {
    const { inputWord, board } = req.body;
  
    try {
      const isValid = await validateWord(inputWord, board);
      res.status(200).json({ isValid });
    } catch (error) {
      console.log('Game Board:', inputWord);
      console.log('New Word:', board);
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
// let inputWord = "sulks";
// let board = "KIP*JILURPKSDVHA";
// validateWord(inputWord, board).then(result => {
//       console.log(result);
//     }).catch(error => {
//       console.error(error.message);
//     });

// KIP*
// JILU
// RPKS
// DVHA

// output = [['K','I','P','*'],['J','I','L','U'],['R','P','K','S'],['D','V','H','A']]