const fs = require('fs');
const express = require('express');
const router = express.Router();

async function checkWordInDictionary(inputWord, points){
    try{
        const dictionaryWords = fs.readFileSync('dictionary.txt', 'utf8');
        const dictionaryWord = dictionaryWords.split(/\s+/);
        let wordExist = dictionaryWord.includes(inputWord);
  
        if(wordExist) {
            points++;
            // console.log(points);
            // console.log("Word Exist");
            return { success: true, message: 'Word Exist', points };
        } else {
            // console.log("Word does not exists in dictionary")
            return { success: false, message: 'Word does not exist in the dictionary', points };
        }
    }
    catch (error) {
        throw new Error('Error checking in Dictionary')
    }
}

router.post('/check-word', async (req, res) => {
    const { inputWord, points } = req.body;
  
    try {
      const result = await checkWordInDictionary(inputWord, points);
      res.status(200).json(result);
    } catch (error) {
      
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports =router;
// let word = "ruckled";

// checkWordInDictionary(word, 10).then(result => {
//       console.log(result);
//     }).catch(error => {
//       console.error(error.message);
//     });