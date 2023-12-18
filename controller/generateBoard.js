const express = require('express');
const router = express.Router();

async function generateRandomString() {
    const getRandomChar = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*';
        return characters.charAt(Math.floor(Math.random() * characters.length));
    };
    try {
        let randomString = '';
        for (let i = 0; i < 16; i++) {
        randomString += getRandomChar();
      }
      console.log(randomString);
      return randomString;
    } catch (error) {
      throw new Error('Failed to generate random string');
    }
  }

  router.get('/generate-random-string', async (req, res) => {
    try {
      const randomString = await generateRandomString();
      res.status(200).json({ randomString });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;